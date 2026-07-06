// Generates the downloadable cover / header images for the media kit in the
// Waterhouse drum-machine design language, using the same Satori + resvg
// pipeline as scripts/og/generate.mjs.
//
// Run:  bun run scripts/brand/cover.mjs   (outputs static/brand/waterhouse-cover-*.png)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { Buffer } from 'node:buffer';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');

// Shares the OG script's font cache (gitignored, auto-downloaded).
const FONT_URL =
	'https://raw.githubusercontent.com/google/fonts/main/ofl/jersey15/Jersey15-Regular.ttf';
const fontPath = resolve(here, '../og/fonts/Jersey15-Regular.ttf');
let jersey;
try {
	jersey = readFileSync(fontPath);
} catch {
	console.log('Downloading Jersey 15…');
	const res = await fetch(FONT_URL);
	if (!res.ok) throw new Error(`Font download failed: ${res.status}`);
	jersey = Buffer.from(await res.arrayBuffer());
	mkdirSync(dirname(fontPath), { recursive: true });
	writeFileSync(fontPath, jersey);
}

const CREAM = '#faf6f6';
const AMBER = '#ff8c1a';
const INK = '#111111';

// The logo mark, inlined as a data URI so Satori can place it as an <img>.
const logoSvg = readFileSync(resolve(root, 'static/brand/waterhouse-logo-black.svg'), 'utf8');
const logoUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

const h = (style, children) => ({
	type: 'div',
	props: {
		style:
			Array.isArray(children) && style.display === undefined
				? { display: 'flex', ...style }
				: style,
		children
	}
});
const img = (src, w, hgt, style = {}) => ({
	type: 'img',
	props: { src, width: w, height: hgt, style }
});

// One hardware-panel cover, scaled off a 1500x500 baseline so the same design
// renders correctly at every target size.
function cover(hh) {
	const s = hh / 500;
	const strip = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 12 * s,
		paddingBottom: 12 * s,
		paddingLeft: 30 * s,
		paddingRight: 30 * s,
		fontSize: 20 * s,
		letterSpacing: 7 * s,
		color: 'rgba(0,0,0,0.56)'
	};
	// A row of drum-machine pads; one lit amber.
	const pads = h(
		{ display: 'flex', gap: 10 * s },
		[0, 1, 2, 3].map((i) =>
			h(
				{
					width: 34 * s,
					height: 34 * s,
					borderRadius: 7 * s,
					border: `${3 * s}px solid #000`,
					backgroundColor: i === 2 ? AMBER : '#ffffff',
					boxShadow: `${3 * s}px ${3 * s}px 0 #000`
				},
				[]
			)
		)
	);
	return h(
		{
			width: '100%',
			height: '100%',
			display: 'flex',
			padding: 26 * s,
			backgroundColor: CREAM,
			fontFamily: 'Jersey 15'
		},
		[
			h(
				{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					border: `${6 * s}px solid #000`,
					borderRadius: 20 * s,
					backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #efece6 100%)',
					boxShadow: `${12 * s}px ${12 * s}px 0 #000`
				},
				[
					h({ ...strip, borderBottom: '2px solid rgba(0,0,0,0.14)' }, [
						h({ display: 'flex', alignItems: 'center', gap: 12 * s }, [
							h(
								{
									width: 13 * s,
									height: 13 * s,
									borderRadius: 999,
									backgroundColor: AMBER,
									boxShadow: `0 0 ${12 * s}px ${AMBER}`
								},
								[]
							),
							h({ display: 'flex' }, 'WATERHOUSE · WH—08')
						]),
						h({ display: 'flex' }, 'AMSTERDAM')
					]),
					h(
						{
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingLeft: 50 * s,
							paddingRight: 56 * s,
							gap: 40 * s
						},
						[
							h({ display: 'flex', flexDirection: 'column', gap: 14 * s }, [
								h(
									{ display: 'flex', fontSize: 110 * s, lineHeight: 0.9, color: INK },
									'WATERHOUSE STUDIOS'
								),
								h(
									{ display: 'flex', fontSize: 34 * s, color: AMBER },
									'Music studios · events · 24/7 online radio — Amsterdam'
								)
							]),
							h({ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 26 * s }, [
								img(logoUri, 190 * s, 127 * s),
								pads
							])
						]
					),
					h(
						{
							...strip,
							fontSize: 19 * s,
							letterSpacing: 5 * s,
							borderTop: '2px solid rgba(0,0,0,0.14)'
						},
						[
							h({ display: 'flex' }, 'MADE IN AMSTERDAM'),
							h({ display: 'flex' }, '24·BIT · 96 kHz'),
							h({ display: 'flex', color: INK }, 'waterhousestudios.nl')
						]
					)
				]
			)
		]
	);
}

// A 16:9 banner for platforms whose covers aren't wide strips (YouTube channel
// art 2560x1440, Mixcloud 1600x900). The hardware panel floats centered inside
// the safe area so it survives YouTube's aggressive per-device cropping (the
// guaranteed-visible zone is only the middle ~1546x423 of a 2560x1440 banner).
function banner169(hh) {
	const s = hh / 900;
	const pads = h(
		{ display: 'flex', gap: 12 * s },
		[0, 1, 2, 3].map((i) =>
			h(
				{
					width: 40 * s,
					height: 40 * s,
					borderRadius: 8 * s,
					border: `${3 * s}px solid #000`,
					backgroundColor: i === 2 ? AMBER : '#ffffff',
					boxShadow: `${3 * s}px ${3 * s}px 0 #000`
				},
				[]
			)
		)
	);
	const strip = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 14 * s,
		paddingBottom: 14 * s,
		paddingLeft: 34 * s,
		paddingRight: 34 * s,
		fontSize: 22 * s,
		letterSpacing: 6 * s,
		color: 'rgba(0,0,0,0.56)'
	};
	return h(
		{
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: CREAM,
			fontFamily: 'Jersey 15'
		},
		[
			// Panel constrained to ~60% width so it lands inside YouTube's safe area.
			h(
				{
					width: '60%',
					display: 'flex',
					flexDirection: 'column',
					border: `${6 * s}px solid #000`,
					borderRadius: 22 * s,
					backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #efece6 100%)',
					boxShadow: `${12 * s}px ${12 * s}px 0 #000`
				},
				[
					h({ ...strip, borderBottom: '2px solid rgba(0,0,0,0.14)' }, [
						h({ display: 'flex', alignItems: 'center', gap: 12 * s }, [
							h(
								{
									width: 14 * s,
									height: 14 * s,
									borderRadius: 999,
									backgroundColor: AMBER,
									boxShadow: `0 0 ${12 * s}px ${AMBER}`
								},
								[]
							),
							h({ display: 'flex' }, 'WATERHOUSE · WH—08')
						]),
						h({ display: 'flex' }, 'AMSTERDAM')
					]),
					h(
						{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 24 * s,
							paddingTop: 54 * s,
							paddingBottom: 54 * s
						},
						[
							img(logoUri, 300 * s, 200 * s),
							h(
								{ display: 'flex', fontSize: 76 * s, lineHeight: 0.9, color: INK },
								'WATERHOUSE STUDIOS'
							),
							h(
								{ display: 'flex', fontSize: 30 * s, color: AMBER },
								'Music studios · events · online radio — Amsterdam'
							),
							pads
						]
					),
					h(
						{
							...strip,
							fontSize: 19 * s,
							letterSpacing: 4 * s,
							borderTop: '2px solid rgba(0,0,0,0.14)'
						},
						[
							h({ display: 'flex' }, 'MADE IN AMSTERDAM'),
							h({ display: 'flex', color: INK }, 'waterhousestudios.nl')
						]
					)
				]
			)
		]
	);
}

// Wide-strip covers (roughly 3:1) share the cover() design; 16:9 covers use
// banner169(). SoundCloud header is 2480x520; the strip design scales cleanly.
const COVERS = [
	{ out: 'waterhouse-cover-1500x500.png', w: 1500, h: 500, kind: 'strip' },
	{ out: 'waterhouse-cover-2480x520.png', w: 2480, h: 520, kind: 'strip' },
	{ out: 'waterhouse-cover-3000x1000.png', w: 3000, h: 1000, kind: 'strip' },
	{ out: 'waterhouse-cover-1584x396.png', w: 1584, h: 396, kind: 'strip' },
	{ out: 'waterhouse-cover-2560x1440.png', w: 2560, h: 1440, kind: '169' },
	{ out: 'waterhouse-cover-1600x900.png', w: 1600, h: 900, kind: '169' }
];

for (const c of COVERS) {
	const tree = c.kind === '169' ? banner169(c.h) : cover(c.h);
	const svg = await satori(tree, {
		width: c.w,
		height: c.h,
		fonts: [{ name: 'Jersey 15', data: jersey, weight: 400, style: 'normal' }]
	});
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: c.w } }).render().asPng();
	const outPath = resolve(root, 'static/brand', c.out);
	mkdirSync(dirname(outPath), { recursive: true });
	writeFileSync(outPath, png);
	console.log(`✓ static/brand/${c.out}`);
}
