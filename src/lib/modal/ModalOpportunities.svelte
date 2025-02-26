<script lang="ts">
	import Modal from './Modal.svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose}>
		<div class="space-y-8">
			<div class="space-y-4">
				<h2 class="text-3xl font-bold">Career Growth</h2>
				<p class="text-xl text-teal-200">Opportunities.</p>
				<p class="text-lg leading-relaxed">
					We know that breaking into the industry can be tough, which is why we're dedicated to helping
					you find work as a DJ, sound designer, or musician. Through strategic partnerships with local
					venues and online platforms, we connect you with:
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="space-y-4">
					<h3 class="text-xl font-bold">Gig Opportunities</h3>
					<p class="leading-relaxed">
						Perform at clubs, festivals, and events in Amsterdam. We maintain strong relationships with
						local venues to help you secure regular performance slots.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="text-xl font-bold">Collaborations</h3>
					<p class="leading-relaxed">
						Work with other artists, producers, and creatives to expand your network and portfolio. Our
						community is built on collaboration and mutual growth.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="text-xl font-bold">Exposure</h3>
					<p class="leading-relaxed">
						Grow your fanbase through streaming, social media, and live performances. We provide
						platforms and guidance to help you reach a wider audience.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="text-xl font-bold">Government Stipends</h3>
					<p class="leading-relaxed">
						Help artists apply for subsidies to fund their projects. Navigating financial support can be
						daunting, but our team is here to assist you every step of the way.
					</p>
				</div>
			</div>
		</div>
	</Modal>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}
</style>
