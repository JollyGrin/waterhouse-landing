// Shared, fail-safe client for the public radio lineup
// (GET /api/public/radio/lineup, waterhouse-mono#302).
//
// One fetch + one 5-minute refresh loop is shared by every consumer: each
// component calls `useRadioLineup()` during init, which ref-counts a
// connection from inside `$effect`. So nothing runs at build/prerender time,
// and the loop stops when the last consumer unmounts.
//
// Fail-safe by construction: a network error, timeout, non-OK response or bad
// top-level shape sets `status = 'error'` with no shows, and nothing throws.
// Individual malformed shows are dropped.
//
// The endpoint can be overridden with PUBLIC_RADIO_LINEUP_URL (e.g. a local
// fixture). It is read inside the fetch, client-side only, because
// $env/dynamic/public can't be read during prerender.
import { env } from '$env/dynamic/public';

export const DEFAULT_RADIO_LINEUP_URL = 'https://api.waterhousestudios.nl/api/public/radio/lineup';
export const RADIO_TIMEZONE = 'Europe/Amsterdam';

const REFRESH_MS = 5 * 60_000;
/** How often `now` ticks, so live/next roll over between fetches. */
const CLOCK_MS = 30_000;
const TIMEOUT_MS = 10_000;

export type RadioArtist = { id: string; stage_name: string };

export type RadioShow = {
	id: string;
	title: string;
	/** ISO strings as sent by the API. */
	start_time: string;
	end_time: string;
	/** Parsed epoch ms, for comparisons. */
	start: number;
	end: number;
	artists: RadioArtist[];
};

/** `loading` until the first response; `error` = no data (hide UI); `ready` = data (may be empty). */
export type RadioLineupStatus = 'loading' | 'ready' | 'error';

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

function parseArtist(v: unknown): RadioArtist | null {
	if (!isObject(v) || typeof v.stage_name !== 'string' || !v.stage_name.trim()) return null;
	return { id: typeof v.id === 'string' ? v.id : v.stage_name, stage_name: v.stage_name };
}

function parseShow(v: unknown): RadioShow | null {
	if (!isObject(v)) return null;
	const { id, title, start_time, end_time, artists } = v;
	if (typeof id !== 'string' || typeof title !== 'string') return null;
	if (typeof start_time !== 'string' || typeof end_time !== 'string') return null;
	const start = Date.parse(start_time);
	const end = Date.parse(end_time);
	if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return null;
	return {
		id,
		title,
		start_time,
		end_time,
		start,
		end,
		artists: Array.isArray(artists)
			? artists.map(parseArtist).filter((a): a is RadioArtist => a !== null)
			: []
	};
}

/** Returns the parsed shows (sorted by start), or null if the payload is unusable. */
export function parseLineup(data: unknown): RadioShow[] | null {
	if (!isObject(data) || !Array.isArray(data.shows)) return null;
	return data.shows
		.map(parseShow)
		.filter((s): s is RadioShow => s !== null)
		.sort((a, b) => a.start - b.start);
}

class RadioLineup {
	status = $state<RadioLineupStatus>('loading');
	/** Every show from the last good response, including ones that have since ended. */
	#all = $state.raw<RadioShow[]>([]);
	/** Ticks every 30s while connected, so the derived values below stay current. */
	now = $state(Date.now());

	/** Shows not yet ended (live + upcoming), sorted by start. */
	shows = $derived(this.#all.filter((s) => s.end > this.now));
	/** The show on air right now (start <= now < end), if any. */
	liveShow = $derived(this.shows.find((s) => s.start <= this.now) ?? null);
	/** Shows that haven't started yet. */
	upcoming = $derived(this.shows.filter((s) => s.start > this.now));
	/** The next show to start (excludes the live one). */
	nextShow = $derived(this.upcoming[0] ?? null);

	#consumers = 0;
	#timers: ReturnType<typeof setInterval>[] = [];
	#seq = 0;

	async refresh() {
		const seq = ++this.#seq;
		const ctrl = new AbortController();
		const timeout = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
		let shows: RadioShow[] | null = null;
		try {
			const res = await fetch(env.PUBLIC_RADIO_LINEUP_URL || DEFAULT_RADIO_LINEUP_URL, {
				signal: ctrl.signal,
				headers: { accept: 'application/json' }
			});
			if (res.ok) shows = parseLineup(await res.json());
		} catch {
			shows = null;
		} finally {
			clearTimeout(timeout);
		}
		if (seq !== this.#seq) return; // a newer refresh superseded this one
		this.now = Date.now();
		this.#all = shows ?? [];
		this.status = shows ? 'ready' : 'error';
	}

	/** Starts the shared loop for one consumer; returns its cleanup. */
	connect(): () => void {
		if (this.#consumers++ === 0) {
			this.refresh();
			this.#timers = [
				setInterval(() => this.refresh(), REFRESH_MS),
				setInterval(() => (this.now = Date.now()), CLOCK_MS)
			];
		}
		return () => {
			if (--this.#consumers === 0) {
				this.#timers.forEach(clearInterval);
				this.#timers = [];
			}
		};
	}
}

/** The single shared lineup instance. Prefer `useRadioLineup()` in components. */
export const radioLineup = new RadioLineup();

/**
 * Call during component init. Connects the shared lineup client-side (inside
 * `$effect`, so never during prerender) and returns the reactive instance:
 * `status`, `shows`, `liveShow`, `nextShow`, `upcoming`, `now`.
 */
export function useRadioLineup() {
	$effect(() => radioLineup.connect());
	return radioLineup;
}

const dayFmt = new Intl.DateTimeFormat('en-GB', {
	timeZone: RADIO_TIMEZONE,
	weekday: 'short',
	day: 'numeric',
	month: 'short'
});
const timeFmt = new Intl.DateTimeFormat('en-GB', {
	timeZone: RADIO_TIMEZONE,
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23'
});

/** e.g. "Fri 6 Nov", in Amsterdam time regardless of the visitor's timezone. */
export const formatShowDay = (ms: number) => dayFmt.format(ms);
/** e.g. "20:00", in Amsterdam time. */
export const formatShowTime = (ms: number) => timeFmt.format(ms);
/** e.g. "20:00–22:00", in Amsterdam time. */
export const formatShowRange = (show: Pick<RadioShow, 'start' | 'end'>) =>
	`${formatShowTime(show.start)}–${formatShowTime(show.end)}`;
