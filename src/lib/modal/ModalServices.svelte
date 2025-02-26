<script lang="ts">
	import Modal from './Modal.svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose}>
		<div class="space-y-8">
			<div class="space-y-4">
				<h2 class="text-3xl font-bold">Artist Development</h2>
				<p class="text-xl text-teal-200">Services.</p>
				<p class="text-lg leading-relaxed">
					At Waterhouse Studios, we're not just a space to create—we're a launchpad for your career. Our
					mission is to help artists grow professionally, connect with opportunities, and thrive in the
					industry.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<div class="space-y-4">
					<h3 class="text-xl font-bold">Workshops</h3>
					<p class="leading-relaxed">
						Learn the ins and outs of music production, online promotion, and content creation from
						industry experts.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="text-xl font-bold">One-on-One Mentorship</h3>
					<p class="leading-relaxed">
						Get personalized guidance from seasoned professionals who understand the challenges and
						opportunities of the music world.
					</p>
				</div>

				<div class="space-y-4">
					<h3 class="text-xl font-bold">Performance Opportunities</h3>
					<p class="leading-relaxed">
						Showcase your talents at our regular events and artist showcases, where you can perform for
						live audiences and connect with industry insiders.
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
