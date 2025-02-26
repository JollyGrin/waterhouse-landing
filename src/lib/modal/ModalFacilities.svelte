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
				<div class="space-y-6 rounded-lg border border-teal-700 bg-black/20 p-6">
					<div class="space-y-4">
						<h3 class="text-2xl">Music Studios</h3>
						<p class="font-mono text-sm leading-relaxed">
							Our fully equipped music studios are designed for recording, mixing, and producing.
						</p>
					</div>

					<div class="grid gap-6 md:grid-cols-2">
						<div class="space-y-3">
							<h4 class="font-mono text-sm text-teal-400">Recording</h4>
							<ul class="list-inside list-disc space-y-2 font-mono text-sm">
								<li>Pro microphones</li>
								<li>Isolation booths</li>
								<li>Acoustic treatment</li>
								<li>Multiple rooms</li>
							</ul>
						</div>

						<div class="space-y-3">
							<h4 class="font-mono text-sm text-teal-400">Production</h4>
							<ul class="list-inside list-disc space-y-2 font-mono text-sm">
								<li>Pro Tools HD</li>
								<li>Mixing consoles</li>
								<li>MIDI equipment</li>
								<li>Monitor speakers</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="space-y-6 rounded-lg border border-teal-700 bg-black/20 p-6">
					<div class="space-y-4">
						<h3 class="text-2xl">Stream Room</h3>
						<p class="font-mono text-sm leading-relaxed">
							Ready for Twitch and YouTube broadcasts, perfect for building your online presence.
						</p>
					</div>

					<div class="grid gap-6 md:grid-cols-2">
						<div class="space-y-3">
							<h4 class="font-mono text-sm text-teal-400">Streaming Setup</h4>
							<ul class="list-inside list-disc space-y-2 font-mono text-sm">
								<li>4K cameras</li>
								<li>Pro lighting</li>
								<li>Green screen</li>
								<li>Stream deck</li>
							</ul>
						</div>

						<div class="space-y-3">
							<h4 class="font-mono text-sm text-teal-400">Audio/Visual</h4>
							<ul class="list-inside list-disc space-y-2 font-mono text-sm">
								<li>Audio interface</li>
								<li>Multiple mics</li>
								<li>Monitor setup</li>
								<li>Sound treatment</li>
							</ul>
						</div>
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
