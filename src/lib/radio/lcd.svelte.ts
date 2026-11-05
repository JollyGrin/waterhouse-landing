// State + clock for the hero LCD's radio screen (#26, mockup "A · Up Next").
//
// The shared lineup client only advances `now` every 30s and at boundaries,
// which is too coarse for a seconds countdown. So the LCD keeps its own
// 1-second clock (paused while the tab is hidden) and derives its state from
// that clock plus the lineup's shows. Nothing else ticks every second.
import { untrack } from 'svelte';
import type { RadioLineupStatus, RadioShow } from './lineup.svelte';

/** Under this long before the next show, the LCD switches to the PRE-SHOW countdown. */
export const PRESHOW_MS = 60 * 60_000;

export type LcdState =
	/** No usable lineup (loading, error, or nothing scheduled): show the original sampler video. */
	| { kind: 'fallback' }
	/** A show's slot has started (the Twitch embed takes over once stream status reports live). */
	| { kind: 'onair'; show: RadioShow }
	| { kind: 'preshow'; show: RadioShow; ms: number }
	| { kind: 'offair'; show: RadioShow; ms: number; following: RadioShow[] };

/** `shows` must be sorted by start (as the lineup client provides them). */
export function lcdState(
	status: RadioLineupStatus,
	shows: readonly RadioShow[],
	now: number
): LcdState {
	if (status !== 'ready') return { kind: 'fallback' };
	const live = shows.find((s) => s.start <= now && now < s.end);
	if (live) return { kind: 'onair', show: live };
	const upcoming = shows.filter((s) => s.start > now);
	const next = upcoming[0];
	if (!next) return { kind: 'fallback' };
	const ms = next.start - now;
	if (ms < PRESHOW_MS) return { kind: 'preshow', show: next, ms };
	return { kind: 'offair', show: next, ms, following: upcoming.slice(1, 3) };
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/** "2D 03:40:00" when a day or more out, else "03:40:00". */
export function formatCountdown(ms: number) {
	const total = Math.max(0, Math.floor(ms / 1000));
	const d = Math.floor(total / 86_400);
	const hms = `${pad2(Math.floor(total / 3600) % 24)}:${pad2(Math.floor(total / 60) % 60)}:${pad2(total % 60)}`;
	return d ? `${d}D ${hms}` : hms;
}

/** "T-12:05" (minutes:seconds, for the last hour). */
export function formatPreshow(ms: number) {
	const total = Math.max(0, Math.floor(ms / 1000));
	return `T-${pad2(Math.floor(total / 60))}:${pad2(total % 60)}`;
}

/**
 * Call during component init. Returns `{ now }`, updated on every whole
 * second while the tab is visible (and immediately when it becomes visible).
 *
 * Dev only: `?lcdnow=<ISO>` shifts the clock to that instant (it keeps
 * ticking from there). `import.meta.env.DEV` is false in production builds,
 * so the override is compiled out there.
 */
export function useLcdClock() {
	const clock = $state({ now: Date.now() });
	$effect(() =>
		untrack(() => {
			let offset = 0;
			if (import.meta.env.DEV) {
				const t = Date.parse(new URLSearchParams(location.search).get('lcdnow') ?? '');
				if (Number.isFinite(t)) offset = t - Date.now();
			}
			let timer: ReturnType<typeof setTimeout> | undefined;
			const tick = () => {
				const now = Date.now() + offset;
				clock.now = now;
				clearTimeout(timer);
				// Land just past the next whole second so the countdown steps evenly.
				timer = setTimeout(tick, 1000 - (now % 1000) + 5);
			};
			const onVisibility = () => {
				if (document.visibilityState === 'visible') tick();
				else {
					clearTimeout(timer);
					timer = undefined;
				}
			};
			document.addEventListener('visibilitychange', onVisibility);
			if (document.visibilityState === 'visible') tick();
			else clock.now = Date.now() + offset;
			return () => {
				clearTimeout(timer);
				document.removeEventListener('visibilitychange', onVisibility);
			};
		})
	);
	return clock;
}
