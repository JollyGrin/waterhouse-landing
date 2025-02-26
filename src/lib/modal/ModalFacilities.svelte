<script lang="ts">
	import Modal from './Modal.svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose}>
		<div class="space-y-8">
			<div class="space-y-4">
				<h2 class="text-4xl">State-of-the-Art Facilities</h2>
				<p class="font-mono text-sm text-teal-400">Designed for optimal acoustics and workflow</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="space-y-4">
					<h3 class="text-2xl">Music Studios</h3>
					<div class="space-y-4 font-mono text-sm leading-relaxed">
						<p>
							Our fully equipped music studios are designed for recording, mixing, and producing, complete with professional-grade equipment to bring your vision to life.
						</p>
						<p>
							Subscription model provides a flexible and affordable way to secure consistent studio time. With access to our top-notch facilities tailored to your schedule, you'll have the freedom to record, mix, or stream at your own pace, making it easier to bring your vision to life.
						</p>
					</div>
				</div>

				<div class="space-y-4">
					<h3 class="text-2xl">Stream Room</h3>
					<div class="space-y-4 font-mono text-sm leading-relaxed">
						<p>
							Ready for Twitch and YouTube broadcasts, our stream room is perfect for artists looking to build their online presence and connect with global audiences.
						</p>
					</div>
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
