// JSON-LD schema builders. All entities are cross-linked by @id so search engines
// and AI answer engines resolve them into one knowledge graph.
import { SITE, SAME_AS, PRICING, LINKS } from '$lib/site';

const VENUE_ID = `${SITE.url}/#venue`;

// The core business entity — a MusicVenue (a LocalBusiness subtype). Emitted
// site-wide from the root layout so every page carries the address, geo, and
// sameAs signals.
export function venueSchema() {
	return {
		'@type': ['MusicVenue', 'LocalBusiness'],
		'@id': VENUE_ID,
		name: SITE.name,
		description: SITE.description,
		url: SITE.url,
		email: SITE.email,
		logo: `${SITE.url}/logo.png`,
		image: `${SITE.url}${SITE.ogImage}`,
		address: {
			'@type': 'PostalAddress',
			streetAddress: SITE.address.street,
			postalCode: SITE.address.postalCode,
			addressLocality: SITE.address.city,
			addressRegion: SITE.address.region,
			addressCountry: SITE.address.country
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: SITE.geo.latitude,
			longitude: SITE.geo.longitude
		},
		hasMap: LINKS.maps,
		sameAs: SAME_AS
	};
}

// Wraps one or more entities in a @graph document.
export function graph(...nodes: object[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': nodes
	};
}

// BreadcrumbList for a content page. `trail` excludes Home (added automatically).
export function breadcrumb(trail: { name: string; path: string }[]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: `${SITE.url}${item.path === '/' ? '' : item.path}`
		}))
	};
}

// The studio-rental service with its priced offers.
export function studioServiceSchema() {
	const offers = [
		{
			name: 'Shared studio — hourly',
			price: PRICING.sharedHourly,
			unit: 'per hour'
		},
		...PRICING.sharedBundles.map((b) => ({
			name: `Shared studio — ${b.hours} hour bundle`,
			price: b.price,
			unit: `${b.hours} hours`
		})),
		{ name: 'Solo studio — private 24/7', price: PRICING.soloMonthly, unit: 'per month' }
	];
	return {
		'@type': 'Service',
		'@id': `${SITE.url}/studios#service`,
		serviceType: 'Music studio rental',
		name: 'Music studio rental in Amsterdam',
		provider: { '@id': VENUE_ID },
		areaServed: { '@type': 'City', name: 'Amsterdam' },
		offers: offers.map((o) => ({
			'@type': 'Offer',
			name: o.name,
			price: o.price,
			priceCurrency: PRICING.currency,
			availability: 'https://schema.org/InStock',
			url: `${SITE.url}/studios`,
			description: o.unit
		}))
	};
}

// The atelier (office) rental offer.
export function atelierServiceSchema() {
	return {
		'@type': 'Service',
		'@id': `${SITE.url}/ateliers#service`,
		serviceType: 'Creative office / atelier rental',
		name: 'Atelier rental for artists and music professionals in Amsterdam',
		provider: { '@id': VENUE_ID },
		areaServed: { '@type': 'City', name: 'Amsterdam' },
		offers: {
			'@type': 'Offer',
			name: 'Atelier — monthly',
			price: PRICING.atelierMonthly,
			priceCurrency: PRICING.currency,
			availability: 'https://schema.org/InStock',
			url: `${SITE.url}/ateliers`,
			description: 'per month'
		}
	};
}

// The online radio station.
export function radioStationSchema() {
	return {
		'@type': 'RadioBroadcastService',
		'@id': `${SITE.url}/radio#station`,
		name: 'Waterhouse Radio',
		broadcastDisplayName: 'Waterhouse Studios Live',
		description:
			'A weekly online radio stream broadcasting live DJ sets and shows from Amsterdam artists, streamed from the Waterhouse Studios stream room on Twitch.',
		url: `${SITE.url}/radio`,
		provider: { '@id': VENUE_ID },
		broadcaster: { '@id': VENUE_ID },
		sameAs: [LINKS.twitch, LINKS.youtube]
	};
}

// FAQPage from a list of Q&A pairs (must mirror the visible page content).
export function faqSchema(items: { q: string; a: string }[]) {
	return {
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: { '@type': 'Answer', text: item.a }
		}))
	};
}
