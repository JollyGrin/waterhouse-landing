<script lang="ts">
	let { w = 200, className = '' }: { w?: number; className?: string } = $props();
</script>

<svg
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	viewBox="0 0 24 24"
	width={w}
	height={w}
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
	class={className}
	><path
		d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
	/><path d="m10 15 5-3-5-3z" /></svg
>
