<script lang="ts">
	import Modal from './Modal.svelte';
	let {
		isOpen = false,
		onClose,
		onOpenJoin
	}: { isOpen?: boolean; onClose(): void; onOpenJoin(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="State-of-the-Art Facilities">
		<div class="space-y-1">
			<p class="font-jersey text-highlight text-2xl">Designed for optimal acoustics and workflow</p>

			<div class="grid gap-8 md:grid-cols-2">
				<div class=" bg-secondary/20 space-y-6 rounded-lg p-6">
					<div class="space-y-4">
						<h3 class="font-jersey text-2xl">Music Studios</h3>
						<p class="font-ovo text-sm leading-relaxed">
							Our fully equipped music studios are designed for recording, mixing, and producing.
						</p>
					</div>

					<div class="grid gap-6 md:grid-cols-2">
						<div class="space-y-3">
							<h4 class="font-jersey text-highlight text-lg">Recording</h4>
							<ul class="space-y-2 font-mono text-sm">
								<li>Pro microphones</li>
								<li>Isolation booths</li>
								<li>Acoustic treatment</li>
								<li>Multiple rooms</li>
							</ul>
						</div>

						<div class="space-y-3">
							<h4 class="font-jersey text-highlight text-lg">Production</h4>
							<ul class="space-y-2 font-mono text-sm">
								<li>Pro Tools HD</li>
								<li>Mixing consoles</li>
								<li>MIDI equipment</li>
								<li>Monitor speakers</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="bg-secondary/20 space-y-6 rounded-lg p-6">
					<div class="space-y-4">
						<h3 class="font-jersey text-2xl">Stream Room</h3>
						<p class="font-ovo text-sm leading-relaxed">
							Ready for Twitch and YouTube broadcasts, perfect for building your online presence.
						</p>
					</div>

					<div class="grid gap-6 md:grid-cols-2">
						<div class="space-y-3">
							<h4 class="font-jersey text-highlight text-lg">Stream Setup</h4>
							<ul class="space-y-2 font-mono text-sm">
								<li>4K cameras</li>
								<li>Pro lighting</li>
								<li>Green screen</li>
								<li>Stream deck</li>
							</ul>
						</div>

						<div class="space-y-3">
							<h4 class="font-jersey text-highlight text-lg">Audio/Visual</h4>
							<ul class="space-y-2 font-mono text-sm">
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
		<button
			class="midi bg-highlight text-primary font-sigmar py-1 tracking-widest"
			onclick={onOpenJoin}
		>
			View Plans
		</button>
	</Modal>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}
</style>
