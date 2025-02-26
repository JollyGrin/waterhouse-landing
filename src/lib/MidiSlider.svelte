<input type="range" min="0" max="100" value="0" class="range-slider" id="color-slider" />

<style>
	input[type='range'] {
		height: 100%;
		writing-mode: vertical-lr;
		direction: rtl;
		appearance: slider-vertical;
		width: 16px;
		vertical-align: bottom;
		background: transparent;
	}

	/* Track styles */
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		background: #134e4a;
		border: 1px solid #0f766e;
		border-radius: 4px;
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		background: #134e4a;
		border: 1px solid #0f766e;
		border-radius: 4px;
	}

	/* Thumb (dot) styles */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #14b8a6;
		border: 2px solid #0d9488;
		margin-top: -4px;
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #14b8a6;
		border: 2px solid #0d9488;
		cursor: pointer;
	}

	/* Focus styles */
	input[type='range']:focus {
		outline: none;
	}

	input[type='range']:focus::-webkit-slider-thumb {
		background: #2dd4bf;
		border-color: #14b8a6;
	}

	input[type='range']:focus::-moz-range-thumb {
		background: #2dd4bf;
		border-color: #14b8a6;
	}
</style>
