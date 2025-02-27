<div class="turntable-container flex items-center justify-center p-4">
	<div class="turntable">
		<div class="record">
			<div class="grooves"></div>
			<div class="label">
				<div class="center-dot"></div>
				<div class="record-text font-jersey">
					{#each Array(12) as _, i}
						<span style="transform: rotate({i * 30}deg) translateY(-310%)">WATERHOUSE</span>
					{/each}
				</div>
			</div>
		</div>
		<div class="tonearm"></div>
	</div>
</div>

<style>
	.turntable-container {
		aspect-ratio: 1;
	}

	.turntable {
		position: relative;
		width: 100%;
		height: 100%;
		background: transparent;
		border-radius: 10px;
		padding: 2rem;
	}

	.record {
		position: relative;
		width: 100%;
		height: 100%;
		background: #111;
		border-radius: 50%;
		animation: spin 4s linear infinite;
		overflow: hidden;
	}

	.grooves {
		position: absolute;
		inset: 0;
		background: repeating-radial-gradient(
			circle at center,
			var(--color-highlight) 0,
			var(--color-highlight) 2px,
			var(--color-secondary) 3px,
			var(--color-secondary) 4px
		);
	}

	.label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40%;
		height: 40%;
		background: var(--color-primary);
		border-radius: 50%;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.center-dot {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 12px;
		height: 12px;
		background: #000;
		border-radius: 50%;
		z-index: 2;
	}

	.record-text {
		position: absolute;
		width: 100%;
		height: 100%;
		animation: text-spin 8s linear infinite reverse;
	}

	.record-text span {
		position: absolute;
		left: 50%;
		top: 50%;
		transform-origin: 0 0;
		font-size: 0.8rem;
		font-weight: bold;
		text-transform: uppercase;
		user-select: none;
		color: var(--color-secondary);
		white-space: nowrap;
		letter-spacing: 0.1em;
	}

	@keyframes text-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.tonearm {
		position: absolute;
		top: 10%;
		right: 10%;
		width: 40%;
		height: 4px;
		background: var(--color-highlight);
		transform-origin: right center;
		transform: rotate(-20deg);
		z-index: 2;
	}

	.tonearm::after {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 8px;
		height: 8px;
		background: var(--color-highlight);
		border-radius: 50%;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
