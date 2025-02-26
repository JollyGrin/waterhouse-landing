<script lang="ts">
	import Modal from './Modal.svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="Artists Development Programs">
		<div class="space-y-8">
			<p class="font-jersey text-highlight text-lg">A launchpad for your career</p>
			<div class="space-y-4 font-mono text-sm leading-relaxed">
				<p class="font-ovo">
					At Waterhouse Studios, we're not just a space to create—we're a launchpad for your career.
					Our mission is to help artists grow professionally, connect with opportunities, and thrive
					in the industry.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<div class="space-y-4">
					<h3 class="font-jersey text-2xl">Workshops</h3>
					<p class="font-ovo text-sm leading-relaxed">
						Learn the ins and outs of music production, online promotion, and content creation from
						industry experts.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="font-jersey text-2xl">Mentorship</h3>
					<p class="font-ovo text-sm leading-relaxed">
						Get personalized guidance from seasoned professionals who understand the challenges and
						opportunities of the music world.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="font-jersey text-2xl">Performance</h3>
					<p class="font-ovo text-sm leading-relaxed">
						Showcase your talents at our regular events and artist showcases, where you can perform
						for live audiences and connect with industry insiders.
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
