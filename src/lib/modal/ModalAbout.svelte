<script lang="ts">
	import Modal from './Modal.svelte';
	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();

	// Using $derived for reactive values in runes mode
	const showModal = $derived(isOpen);
</script>

<!-- SEO-friendly content that's always in the HTML but visually hidden unless modal is open -->
<div class="modal-content" class:seo-only={!showModal}>
	<Modal {isOpen} {onClose}>
		<div class="space-y-8">
		<div class="space-y-4">
			<h2 class="text-4xl">A Space Crafted for Music Creators</h2>
			<p class="font-mono text-sm text-teal-400">and Industry Professionals</p>
		</div>

		<div class="space-y-6">
			<p class="font-mono text-sm leading-relaxed">
				At Waterhouse Studios, everything we offer is tailored specifically to the needs of music creators and the people working in the music industry. Our mission is to provide cutting-edge facilities and foster a collaborative environment where artists and professionals can connect, create, and succeed.
			</p>

			<p class="font-mono text-sm leading-relaxed">
				Waterhouse Studios offers premium music studios, each custom-designed by industry professionals for optimal acoustics and workflow. Built by creators, for creators, our spaces provide the perfect environment to produce, collaborate, and grow.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-2xl">Why Waterhouse Studios?</h3>
			<div class="space-y-4 font-mono text-sm">
				<p>
					What sets Waterhouse Studios apart? It's the combination of world-class facilities, comprehensive artist development resources, and a vibrant community—all in one place. We're more than just a studio; we're a partner in your creative journey.
				</p>
				<ul class="list-inside list-disc space-y-2">
					<li>
						<span class="text-teal-400">For Up-and-Coming Artists:</span> Waterhouse Studios is your launchpad. Refine your skills, build your online presence, and get the opportunities you need to break into the industry.
					</li>
					<li>
						<span class="text-teal-400">For Established Artists:</span> Experiment with new ideas, collaborate with fresh talent, and reach new audiences in a space designed to elevate your career.
					</li>
				</ul>
			</div>
		</div>

		<div class="space-y-4">
			<h3 class="text-2xl">A Vibrant Community</h3>
			<div class="space-y-4 font-mono text-sm">
				<p>
					At the heart of Waterhouse Studios is a thriving community of creatives who share a passion for innovation and artistic excellence. Here, you'll find a supportive network of peers and mentors who are as invested in your success as you are.
				</p>
				<ul class="list-inside list-disc space-y-2">
					<li>
						<span class="text-teal-400">Forge Connections:</span> Meet like-minded artists, exchange ideas, and collaborate on groundbreaking projects.
					</li>
					<li>
						<span class="text-teal-400">Experiment and Innovate:</span> Use our space to push boundaries, try new sounds, and explore fresh creative directions.
					</li>
					<li>
						<span class="text-teal-400">Inspire and Be Inspired:</span> Whether you're jamming in the studio, streaming to a global audience, or performing on stage, you'll be part of a dynamic, inspiring environment.
					</li>
				</ul>
			</div>
		</div>
	</div>
	</Modal>
</div>

<style>
	/* Hidden visually but available to search engines when modal is closed */
	.seo-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
