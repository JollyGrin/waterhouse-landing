<input type="range" min="0" max="100" value="0" class="range-slider" id="color-slider" />

<style>
	input[type='range'] {
		height: 100%;
		writing-mode: vertical-lr;
		direction: rtl;
		appearance: slider-vertical;
		width: 6px;
		vertical-align: bottom;
		-webkit-appearance: none;
		background-color: oklch(0.704 0.14 182.503);
	}
	input[type='range']::-webkit-slider-runnable-track {
		height: 10px;
		-webkit-appearance: none;
		/* color: #13bba4; */
		margin-top: -1px;
	}

	input[type='range']::-webkit-slider-thumb {
		width: 20px;
		-webkit-appearance: none;
		height: 2px;
		cursor: ns-resize;
		background: var(--color-primary);
		box-shadow: 0px 0 0 5px var(--color-highlight);
		border-radius: 1px;
	}
</style>
