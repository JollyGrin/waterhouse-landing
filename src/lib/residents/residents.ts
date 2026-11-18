// Mock data for the Resident Artists section.
// Shape mirrors what the incoming data source will provide:
// name, socials, uploaded picture, genre, short description, show history.

export type ResidentSocial = {
	/** Short hardware-style port label: IG, SC, SP, BC… */
	kind: 'IG' | 'SC' | 'SP' | 'BC' | 'YT';
	handle: string;
	url: string;
};

export type ResidentShow = {
	date: string; // ISO date
	title: string;
	room?: string;
};

export type Resident = {
	id: string;
	name: string;
	genre: string;
	description: string;
	/** Uploaded artist photo — mocked with gallery shots for now */
	photo: string;
	socials: ResidentSocial[];
	shows: ResidentShow[];
};

export const RESIDENTS: Resident[] = [
	{
		id: 'mara-voss',
		name: 'Mara Voss',
		genre: 'Deep House',
		description:
			'Warm, chord-driven deep house with a record collector’s ear. Resident since day one, Mara runs the Sunday listening sessions.',
		photo: '/gallery/event_1.jpg',
		socials: [
			{ kind: 'IG', handle: '@maravoss', url: 'https://instagram.com/maravoss' },
			{ kind: 'SC', handle: 'maravoss', url: 'https://soundcloud.com/maravoss' }
		],
		shows: [
			{ date: '2026-05-30', title: 'Waterhouse Sessions #18', room: 'Studio A' },
			{ date: '2026-03-14', title: 'Houthaven Open Dag', room: 'Main Floor' },
			{ date: '2025-10-17', title: 'ADE Warm-Up', room: 'Studio A' }
		]
	},
	{
		id: 'kaj',
		name: 'KĀJ',
		genre: 'Techno',
		description:
			'Stripped-back hypnotic techno, all hardware, no laptop. Kaj’s live rig is half the reason the fuse box has a nickname.',
		photo: '/gallery/studio_1.jpg',
		socials: [
			{ kind: 'IG', handle: '@kaj.techno', url: 'https://instagram.com/kaj.techno' },
			{ kind: 'SC', handle: 'kaj-live', url: 'https://soundcloud.com/kaj-live' },
			{ kind: 'BC', handle: 'kaj', url: 'https://kaj.bandcamp.com' }
		],
		shows: [
			{ date: '2026-06-12', title: 'Machine Room 03', room: 'Studio B' },
			{ date: '2026-04-04', title: 'Waterhouse Sessions #16', room: 'Studio A' },
			{ date: '2026-01-23', title: 'New Year Reset', room: 'Main Floor' },
			{ date: '2025-10-18', title: 'ADE Night Shift', room: 'Studio B' }
		]
	},
	{
		id: 'luna-reyez',
		name: 'Luna Reyez',
		genre: 'Neo-Soul',
		description:
			'Singer, writer and producer blending neo-soul with broken beat. Records vocals in Studio C, harmonies stacked twelve deep.',
		photo: '/gallery/gallery_1.jpg',
		socials: [
			{ kind: 'IG', handle: '@lunareyez', url: 'https://instagram.com/lunareyez' },
			{ kind: 'SP', handle: 'Luna Reyez', url: 'https://open.spotify.com/artist/lunareyez' }
		],
		shows: [
			{ date: '2026-05-09', title: 'Live at the Water', room: 'Main Floor' },
			{ date: '2026-02-13', title: 'Valentine Radio Special', room: 'Radio Booth' }
		]
	},
	{
		id: 'dirk-wav',
		name: 'DIRK.WAV',
		genre: 'Electro / Breaks',
		description:
			'Bedroom-breaks producer gone loud. Cuts everything to tape first, then breaks it. Hosts the monthly beat battle.',
		photo: '/gallery/event_2.jpg',
		socials: [
			{ kind: 'IG', handle: '@dirk.wav', url: 'https://instagram.com/dirk.wav' },
			{ kind: 'SC', handle: 'dirkwav', url: 'https://soundcloud.com/dirkwav' },
			{ kind: 'YT', handle: 'dirkwav', url: 'https://youtube.com/@dirkwav' }
		],
		shows: [
			{ date: '2026-06-27', title: 'Beat Battle IV', room: 'Main Floor' },
			{ date: '2026-05-16', title: 'Waterhouse Sessions #17', room: 'Studio A' },
			{ date: '2026-03-27', title: 'Beat Battle III', room: 'Main Floor' }
		]
	},
	{
		id: 'selene-m',
		name: 'Selene M',
		genre: 'Ambient / Modular',
		description:
			'Long-form modular ambient — patches that run for hours. Selene’s eurorack wall is a permanent studio landmark.',
		photo: '/gallery/studio_back.jpg',
		socials: [
			{ kind: 'IG', handle: '@selene.modular', url: 'https://instagram.com/selene.modular' },
			{ kind: 'BC', handle: 'selenem', url: 'https://selenem.bandcamp.com' }
		],
		shows: [
			{ date: '2026-04-19', title: 'Slow Sunday: Drone Edition', room: 'Studio C' },
			{ date: '2025-12-21', title: 'Winter Solstice Longplay', room: 'Main Floor' }
		]
	},
	{
		id: 'ypsilon',
		name: 'Ypsilon',
		genre: 'Drum & Bass',
		description:
			'Fast, surgical drum & bass with a soft spot for 90s jungle. Runs the Thursday DJ practice nights for new residents.',
		photo: '/gallery/event_3.jpg',
		socials: [
			{ kind: 'IG', handle: '@ypsilon.dnb', url: 'https://instagram.com/ypsilon.dnb' },
			{ kind: 'SC', handle: 'ypsilon', url: 'https://soundcloud.com/ypsilon' }
		],
		shows: [
			{ date: '2026-06-05', title: '174 & Rising', room: 'Main Floor' },
			{ date: '2026-04-10', title: 'Jungle Archive Night', room: 'Studio B' },
			{ date: '2026-02-06', title: 'Waterhouse Sessions #15', room: 'Studio A' }
		]
	},
	{
		id: 'nadia-q',
		name: 'Nadia Q',
		genre: 'Afro House',
		description:
			'Percussion-forward afro house, half produced, half played live with a hand-drum setup she built herself.',
		photo: '/gallery/gallery_2.jpg',
		socials: [
			{ kind: 'IG', handle: '@nadiaq.music', url: 'https://instagram.com/nadiaq.music' },
			{ kind: 'SP', handle: 'Nadia Q', url: 'https://open.spotify.com/artist/nadiaq' },
			{ kind: 'SC', handle: 'nadia-q', url: 'https://soundcloud.com/nadia-q' }
		],
		shows: [
			{ date: '2026-05-23', title: 'Rooftop Radio Takeover', room: 'Radio Booth' },
			{ date: '2026-03-07', title: 'Waterhouse Sessions #16', room: 'Studio A' }
		]
	},
	{
		id: 'bram-de-wit',
		name: 'Bram de Wit',
		genre: 'Jazz Fusion',
		description:
			'Keys player and producer bridging jazz fusion and house. If you hear a Rhodes through the wall, it’s Bram.',
		photo: '/gallery/studio_front.jpg',
		socials: [
			{ kind: 'IG', handle: '@bramdewitkeys', url: 'https://instagram.com/bramdewitkeys' },
			{ kind: 'YT', handle: 'bramdewit', url: 'https://youtube.com/@bramdewit' }
		],
		shows: [
			{ date: '2026-06-20', title: 'Fusion Fridays', room: 'Main Floor' },
			{ date: '2026-04-25', title: 'Live at the Water', room: 'Main Floor' },
			{ date: '2026-01-30', title: 'Waterhouse Sessions #14', room: 'Studio A' }
		]
	}
];
