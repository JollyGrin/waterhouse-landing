// Generates static Open Graph / social share images (1200x630) in the Waterhouse
// drum-machine design language, using Satori (layout -> SVG) + resvg (SVG -> PNG).
//
// Run:  bun run og    (regenerates static/og.png and static/og/*.png)
//
// Satori converts text to glyph paths, so resvg needs no font config. We build
// Satori's element tree directly (a lightweight `h` helper) rather than parsing
// HTML, which is both faster and avoids the flaky HTML-to-vnode step.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { Buffer } from 'node:buffer';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');

// Jersey 15 (the brand display face) is fetched on first run and cached locally.
// It is gitignored rather than committed, so no font redistribution here.
const FONT_URL =
	'https://raw.githubusercontent.com/google/fonts/main/ofl/jersey15/Jersey15-Regular.ttf';
const fontPath = resolve(here, 'fonts/Jersey15-Regular.ttf');
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

// Brand palette (mirrors src/app.css @theme tokens).
const CREAM = '#faf6f6';
const AMBER = '#ff8c1a';
const INK = '#111111';

// Minimal hyperscript for Satori: every node is a <div>. Satori requires any div
// with multiple children to declare display:flex, so we default it when missing.
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

const STRIP = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingTop: 20,
	paddingBottom: 20,
	paddingLeft: 34,
	paddingRight: 34,
	fontSize: 24,
	letterSpacing: 8,
	color: 'rgba(0,0,0,0.56)'
};

function card({ title, sub }) {
	return h(
		{
			height: '100%',
			width: '100%',
			display: 'flex',
			padding: 44,
			backgroundColor: CREAM,
			fontFamily: 'Jersey 15'
		},
		[
			h(
				{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					border: '8px solid #000',
					borderRadius: 26,
					backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #efece6 100%)',
					boxShadow: '18px 18px 0 #000'
				},
				[
					// Top brand strip: amber power LED + WATERHOUSE · WH—08 · AMSTERDAM
					h({ ...STRIP, borderBottom: '2px solid rgba(0,0,0,0.14)' }, [
						h({ display: 'flex', alignItems: 'center', gap: 14 }, [
							h(
								{
									width: 15,
									height: 15,
									borderRadius: 999,
									backgroundColor: AMBER,
									boxShadow: `0 0 14px ${AMBER}`
								},
								[]
							),
							h({ display: 'flex' }, 'WATERHOUSE · WH—08')
						]),
						h({ display: 'flex' }, 'AMSTERDAM')
					]),
					// Body: title + subtitle
					h(
						{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							gap: 26,
							paddingLeft: 60,
							paddingRight: 60,
							paddingTop: 44,
							paddingBottom: 44
						},
						[
							h({ display: 'flex', fontSize: 82, lineHeight: 1.02, color: INK }, title),
							h({ display: 'flex', fontSize: 36, color: AMBER }, sub)
						]
					),
					// Bottom serial strip
					h({ ...STRIP, fontSize: 23, letterSpacing: 6, borderTop: '2px solid rgba(0,0,0,0.14)' }, [
						h({ display: 'flex' }, 'MADE IN AMSTERDAM'),
						h({ display: 'flex' }, '24·BIT · 96 kHz'),
						h({ display: 'flex', color: INK }, 'waterhousestudios.nl')
					])
				]
			)
		]
	);
}

// One card per output file. `out` is relative to the static/ directory.
const CARDS = [
	{
		out: 'og.png',
		title: 'Music studios, events & online radio in Amsterdam',
		sub: 'Rent a studio · 24/7 online radio · live events'
	},
	{
		out: 'og/studios.png',
		title: 'Music studio rental in Amsterdam',
		sub: 'Shared from €30/hr · private 24/7 from €1,100/mo'
	},
	{
		out: 'og/ateliers.png',
		title: 'Ateliers for artists & music professionals',
		sub: 'Creative office space · €500 / month'
	},
	{
		out: 'og/residency.png',
		title: 'Artist residency in Amsterdam',
		sub: 'Workshops · mentorship · performances'
	},
	{
		out: 'og/radio.png',
		title: 'Waterhouse Radio — live from Amsterdam',
		sub: '24/7 online DJ streams from the stream room'
	},
	{
		out: 'og/events.png',
		title: 'Events at Waterhouse Studios',
		sub: 'Club nights & showcases · up to 120 people'
	},
	{
		out: 'og/about.png',
		title: 'A space crafted for music creators',
		sub: 'Built by DJs & musicians, for creators'
	},
	{
		out: 'og/faq.png',
		title: 'Frequently asked questions',
		sub: 'Pricing · location · equipment · streaming'
	},
	{ out: 'og/contact.png', title: 'Contact & location', sub: 'Danzigerkade 1, 1013 AP Amsterdam' },
	{
		out: 'og/mediakit.png',
		title: 'Media kit & brand assets',
		sub: 'Logos · covers · colors · typography'
	}
];

for (const c of CARDS) {
	const svg = await satori(card(c), {
		width: 1200,
		height: 630,
		fonts: [{ name: 'Jersey 15', data: jersey, weight: 400, style: 'normal' }]
	});
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
	const outPath = resolve(root, 'static', c.out);
	mkdirSync(dirname(outPath), { recursive: true });
	writeFileSync(outPath, png);
	console.log(`✓ static/${c.out}`);
}
