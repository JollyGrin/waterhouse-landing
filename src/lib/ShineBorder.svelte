<script>
	export let borderWidth = 1;
	export let duration = 14;
	export let shineColor = ['#000000'];
	export let className = '';
	export let style = '';
	export let fullScreen = false;

	$: backgroundImage = `radial-gradient(transparent, transparent, ${Array.isArray(shineColor) ? shineColor.join(',') : shineColor}, transparent, transparent)`;
</script>

<div
	style={`
    --border-width: ${borderWidth}px;
    --duration: ${duration}s;
    background-image: ${backgroundImage};
    ${style}
  `}
	class={`shine-border pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] ${fullScreen ? 'sm:-left-5 sm:-right-5 sm:-top-5 sm:-bottom-5 md:left-0 md:right-0 md:top-0 md:bottom-0' : ''} ${className}`}
></div>

<style>
	@keyframes shine {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 100% 100%;
		}
		100% {
			background-position: 0% 0%;
		}
	}

	.shine-border {
		--border-width: 1px;
		--duration: 14s;
		background-size: 300% 300%;
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		padding: var(--border-width);
		animation: shine var(--duration) infinite linear;
	}
</style>
