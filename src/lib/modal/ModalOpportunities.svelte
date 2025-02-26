<script lang="ts">
	import Modal from './Modal.svelte';
	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="Helping You Get Work">
		<div class="space-y-8">
			<p class="font-jersey text-lg text-teal-400">Breaking into the industry</p>

			<div class="font-ovo space-y-4 text-sm leading-relaxed">
				<p>
					We know that breaking into the industry can be tough, which is why we're dedicated to
					helping you find work as a DJ, sound designer, or musician. Through strategic partnerships
					with local venues and online platforms, we connect you with opportunities that matter.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="space-y-6">
					<div class="space-y-4">
						<h3 class="font-jersey text-2xl">Performance</h3>
						<div class="font-ovo space-y-4 text-sm">
							<p>Perform at clubs, festivals, and events in Amsterdam.</p>
							<ul class="list-inside list-disc space-y-2">
								<li>Club performances</li>
								<li>Festival appearances</li>
								<li>Local events</li>
							</ul>
						</div>
					</div>

					<div class="space-y-4">
						<h3 class="font-jersey text-2xl">Collaborations</h3>
						<div class="font-ovo space-y-4 text-sm">
							<p>
								Work with other artists, producers, and creatives to expand your network and
								portfolio.
							</p>
							<ul class="list-inside list-disc space-y-2">
								<li>Artist collaborations</li>
								<li>Producer networking</li>
								<li>Creative partnerships</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="space-y-6">
					<div class="space-y-4">
						<h3 class="font-jersey text-2xl">Exposure</h3>
						<div class="font-ovo space-y-4 text-sm">
							<p>Grow your fanbase through streaming, social media, and live performances.</p>
							<ul class="list-inside list-disc space-y-2">
								<li>Streaming platforms</li>
								<li>Social media growth</li>
								<li>Live performance exposure</li>
							</ul>
						</div>
					</div>

					<div class="space-y-4">
						<h3 class="font-jersey text-2xl">Government Support</h3>
						<div class="font-ovo space-y-4 text-sm">
							<p>
								Help artists apply for subsidies to fund their projects. Our team is here to assist
								you every step of the way.
							</p>
							<ul class="list-inside list-disc space-y-2">
								<li>Subsidy applications</li>
								<li>Project funding</li>
								<li>Financial guidance</li>
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
