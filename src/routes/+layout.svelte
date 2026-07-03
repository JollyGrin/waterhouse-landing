<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, venueSchema } from '$lib/seo/schema';
	let { children } = $props();
</script>

<!-- Site-wide entity graph: the MusicVenue that every page's schema links back to.
     Per-page <Seo> handles title/description/canonical/robots. -->
<JsonLd schema={graph(venueSchema())} />

<Toaster />
{@render children()}
