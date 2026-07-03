import { SITE } from '$lib/site';

export const prerender = true;

// Indexable, canonical URLs only. Redirect utility routes (/twitch, /chat,
// /review-us) and the login app are intentionally excluded.
const paths = [
	'/',
	'/studios',
	'/ateliers',
	'/residency',
	'/radio',
	'/events',
	'/about',
	'/faq',
	'/contact',
	'/booking',
	'/mediakit',
	'/privacy',
	'/terms'
];

// Build-time date; static export has no request-time clock.
const lastmod = '2026-07-03';

export function GET() {
	const urls = paths
		.map(
			(path) => `  <url>
    <loc>${SITE.url}${path === '/' ? '' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.7'}</priority>
  </url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
