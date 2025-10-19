<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
</svelte:head>

<Toaster />
{@render children()}
