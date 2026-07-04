// Central source of truth for site-wide facts: NAP, socials, pricing, key numbers.
// Keep this byte-consistent with the Google Business Profile and JSON-LD schema —
// NAP (Name / Address / Phone) consistency is the top entity-confidence signal for
// both local search and AI answer engines.

export const SITE = {
	name: 'Waterhouse Studios',
	url: 'https://waterhousestudios.nl',
	tagline: 'Music studios, events & online radio in Amsterdam',
	description:
		'Waterhouse Studios rents 25 acoustically designed music studios in Amsterdam (Houthaven), from €30/hour shared sessions to €1,100/month private 24/7 studios. Home to an artist residency, live events and a weekly online radio stream of Amsterdam DJs and artists.',
	email: 'info@waterhousestudios.nl',
	// Physical location — Houthaven / western harbour, Amsterdam.
	address: {
		street: 'Danzigerkade 1',
		postalCode: '1013 AP',
		city: 'Amsterdam',
		region: 'Noord-Holland',
		country: 'NL'
	},
	// Approximate coordinates for Danzigerkade (Houthaven). Verify against the
	// verified Google Business Profile before treating as authoritative.
	geo: { latitude: 52.3897, longitude: 4.8785 },
	// The default social card image. 1200x630 recommended.
	ogImage: '/og.png',
	// Key facts, reused across pages and schema so numbers never drift.
	facts: {
		studioCount: 25,
		eventCapacity: 120,
		residentCount: 15,
		audio: '24-bit / 96 kHz'
	}
} as const;

export const LINKS = {
	app: 'https://app.waterhousestudios.nl',
	hours: 'https://hours.waterhousestudios.nl',
	maps: 'https://maps.app.goo.gl/nkE2XhCBkjkw9suY6',
	reviews: 'https://g.page/r/CX-2DOpGDJ9YEAE/review',
	instagram: 'https://www.instagram.com/waterhousestudiosamsterdam',
	twitch: 'https://www.twitch.tv/waterhousestudios',
	youtube: 'https://www.youtube.com/@Waterhouse_Studios',
	linkedin: 'https://nl.linkedin.com/company/waterhouse-studios-amsterdam',
	residentAdvisor: 'https://ra.co/clubs/274196',
	dice: 'https://dice.fm/venue/waterhouse-studios-3ovbv'
} as const;

// Every profile that represents the brand — used for schema `sameAs` (entity
// disambiguation) and the footer. The canonical Instagram handle is the longer
// "...amsterdam" one; several unrelated "Waterhouse" accounts exist.
export const SAME_AS: string[] = [
	LINKS.instagram,
	LINKS.twitch,
	LINKS.youtube,
	LINKS.linkedin,
	LINKS.residentAdvisor,
	LINKS.dice
];

// Studio rental pricing. Single source of truth for pages, schema Offers, and
// the machine-readable /pricing.md build artifact.
export const PRICING = {
	sharedHourly: 30,
	sharedBundles: [
		{ hours: 10, price: 150 },
		{ hours: 20, price: 200 },
		{ hours: 40, price: 250 },
		{ hours: 60, price: 300 }
	],
	soloMonthly: 1100,
	atelierMonthly: 500,
	currency: 'EUR'
} as const;

// Primary navigation shared by the header and footer (crawlable internal links).
export const NAV: { href: string; label: string }[] = [
	{ href: '/studios', label: 'Studios' },
	{ href: '/ateliers', label: 'Ateliers' },
	{ href: '/residency', label: 'Residency' },
	{ href: '/radio', label: 'Radio' },
	{ href: '/events', label: 'Events' },
	{ href: '/about', label: 'About' },
	{ href: '/faq', label: 'FAQ' },
	{ href: '/contact', label: 'Contact' }
];
