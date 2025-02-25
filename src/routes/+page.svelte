<script lang="ts">
</script>

<div class="grid min-h-screen place-items-center bg-teal-100 px-6">
	<div class="w-full rounded-lg border-3 border-black bg-white p-4">
		<div class="grid grid-cols-[1fr_1fr_4fr_1fr_1fr] gap-2">
			<div class=" grid grid-rows-[2rem_10rem] gap-2">
				<div class="midi"></div>
				<div class="rounded-lg border-2 border-black"></div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="midi h-full"></div>
				<div class="midi h-full"></div>
				<div class="midi h-full"></div>
			</div>
			<div class="turntable-container bg-black flex items-center justify-center p-4">
				<div class="turntable">
					<div class="record">
						<div class="label"></div>
					</div>
					<div class="tonearm"></div>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="midi h-full"></div>
				<div class="midi h-full"></div>
				<div class="midi h-full"></div>
			</div>
			<div class=" grid grid-rows-[2rem_10rem] gap-2">
				<div class="midi"></div>
				<div class="rounded-lg border-2 border-black"></div>
			</div>
		</div>
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
		background: #333;
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
	}

	.label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 30%;
		height: 30%;
		background: #666;
		border-radius: 50%;
	}

	.tonearm {
		position: absolute;
		top: 10%;
		right: 10%;
		width: 40%;
		height: 4px;
		background: #666;
		transform-origin: right center;
		transform: rotate(-20deg);
	}

	.tonearm::after {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 8px;
		height: 8px;
		background: #666;
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
