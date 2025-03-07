<script lang="ts">
	import { fly } from 'svelte/transition';

	let { title = '', memo = '', info = [['title'], ['title']] } = $props();
</script>

<div
	class="bg-primary shadow-flat hover:shadow-hover space-y-6 rounded-lg border-2 border-black p-6 transition-all hover:translate-y-1"
	in:fly={{ y: 20, duration: 300, delay: 300 }}
>
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<div class="bg-secondary flex h-10 w-10 items-center justify-center rounded-full p-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-primary"
				>
					<rect width="18" height="12" x="3" y="6" rx="2" />
					<path d="M10 12h4" />
					<path d="M12 10v4" />
					<path d="M3 10h18" />
				</svg>
			</div>
			<h3 class="font-jersey text-2xl">{title}</h3>
		</div>
		<p class="font-jersey border-secondary border-l-4 pl-3 text-lg leading-relaxed">
			{memo}
		</p>
	</div>

	{#snippet infoList(items: string[])}
		{@const [header, ...rest] = items}

		<div class="space-y-3">
			<h4
				class="font-jersey text-secondary border-secondary flex items-center gap-2 border-b-2 text-lg"
			>
				{header}
			</h4>
			<ul class="font-jersey text-md">
				{#each rest as service}
					<li class="flex items-center gap-2">{service}</li>
				{/each}
			</ul>
		</div>
	{/snippet}

	<div class="grid gap-6 md:grid-cols-2">
		{#each info as category}
			{@render infoList(category)}
		{/each}
	</div>
</div>
