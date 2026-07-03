<script lang="ts">
	import { NAV, LINKS } from '$lib/site';
</script>

<header class="border-secondary bg-primary border-b-2">
	<nav
		class="font-jersey container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-lg"
		aria-label="Primary"
	>
		<a href="/" class="flex items-center transition-all hover:scale-105">
			<img src="/logo.svg" width="120" height="24" alt="Waterhouse Studios" />
		</a>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-1">
			{#each NAV as item (item.href)}
				<a href={item.href} class="hover:text-amber transition-colors">{item.label}</a>
			{/each}
			<a
				href={LINKS.app}
				class="text-sm opacity-40 transition-all hover:opacity-100"
				rel="nofollow">login</a
			>
		</div>
	</nav>
</header>
