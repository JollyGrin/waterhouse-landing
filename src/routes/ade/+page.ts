import { redirect } from '@sveltejs/kit';

// The 2025 stream-marathon page moved to /ade2025; keep old links working.
export function load() {
	redirect(301, '/ade2025');
}
