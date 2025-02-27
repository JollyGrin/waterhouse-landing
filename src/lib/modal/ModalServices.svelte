<script lang="ts">
	import Modal from './Modal.svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="Artists Development Programs">
		<div class="">
			<p class="font-jersey text-highlight bg-secondary text-primary p-2 text-2xl">
				A launchpad for your career
			</p>
			<div class="my-8 font-mono text-xl leading-relaxed">
				<p class="font-jersey">
					At Waterhouse Studios, we're not just a space to create—we're a launchpad for your career.
					Our mission is to help artists grow professionally, connect with opportunities, and thrive
					in the industry.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<div class="space-y-4">
					<h3 class="font-jersey border-secondary border-b-2 border-dotted text-2xl">Workshops</h3>
					<p class="font-jersey text-lg leading-relaxed">
						Learn the ins and outs of music production, online promotion, and content creation from
						industry experts.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="font-jersey border-secondary border-b-2 border-dotted text-2xl">Mentorship</h3>
					<p class="font-jersey text-lg leading-relaxed">
						Get personalized guidance from seasoned professionals who understand the challenges and
						opportunities of the music world.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="font-jersey border-secondary border-b-2 border-dotted text-2xl">
						Performance
					</h3>
					<p class="font-jersey text-lg leading-relaxed">
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
