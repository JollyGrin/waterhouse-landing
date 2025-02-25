<script lang="ts">
	const currentTime = new Date().toLocaleTimeString('en-US', { 
		hour: '2-digit',
		minute: '2-digit',
		hour12: true 
	});
</script>

<div class="min-h-screen bg-[#00FF00] p-4">
	<div class="max-w-4xl mx-auto bg-white border-4 border-black rounded-lg p-6">
		<!-- Header with Time and Triangle -->
		<div class="relative h-32 mb-6 flex justify-center items-center">
			<div class="text-sm absolute top-2 right-2">{currentTime}</div>
			<div class="w-24 h-24 bg-gray-400">
				<!-- Triangle placeholder - replace with actual triangle image -->
			</div>
			<div class="absolute top-2 right-12">
				<span class="inline-block w-4 h-3 bg-black"></span>
			</div>
		</div>

		<!-- Main Grid -->
		<div class="grid grid-cols-4 gap-4">
			<!-- Left Controls -->
			<div class="col-span-1 space-y-4">
				<div class="border-2 border-black p-2 rounded-lg">
					<div class="w-8 h-8 border-2 border-black rounded-lg"></div>
				</div>
				<div class="border-2 border-black p-2 rounded-lg">
					<div class="w-8 h-8 border-2 border-black rounded-lg"></div>
				</div>
				<div class="h-48 border-2 border-black rounded-lg relative">
					<div class="absolute w-4 h-4 bg-white border-2 border-black left-1/2 transform -translate-x-1/2" style="top: 30%"></div>
				</div>
				<div class="space-y-2">
					<div class="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">REC</div>
					<div class="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">PLAY</div>
					<div class="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">●</div>
				</div>
			</div>

			<!-- Center Content -->
			<div class="col-span-2 space-y-4">
				<div class="border-2 border-black p-4 rounded-lg">
					<h2 class="text-2xl font-bold mb-2">CONTACT</h2>
					<p class="text-sm">LETSPLAY@MADEBYANALOGUE.CO.UK</p>
				</div>
				<div class="border-2 border-black p-4 rounded-lg">
					<h2 class="text-2xl font-bold mb-2">JOBS</h2>
					<p class="text-sm">JOBS@MADEBYANALOGUE.CO.UK</p>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<a href="#" class="border-2 border-black p-4 rounded-lg flex items-center justify-center">
						<span class="text-2xl">Instagram</span>
					</a>
					<a href="#" class="border-2 border-black p-4 rounded-lg flex items-center justify-center">
						<span class="text-2xl">LinkedIn</span>
					</a>
					<a href="#" class="border-2 border-black p-4 rounded-lg flex items-center justify-center">
						<span class="text-2xl">Vimeo</span>
					</a>
					<a href="#" class="border-2 border-black p-4 rounded-lg flex items-center justify-center">
						<span class="text-2xl">Behance</span>
					</a>
				</div>
			</div>

			<!-- Right Controls -->
			<div class="col-span-1 space-y-4">
				<div class="border-2 border-black p-2 rounded-lg">
					<div class="w-8 h-8 border-2 border-black rounded-lg"></div>
				</div>
				<div class="border-2 border-black p-2 rounded-lg">
					<div class="w-8 h-8 border-2 border-black rounded-lg"></div>
				</div>
				<div class="border-2 border-black p-4 rounded-lg">SAMPLE</div>
				<div class="border-2 border-black p-4 rounded-lg">DRUM</div>
				<div class="relative mt-8">
					<div class="border-2 border-black rounded-full p-8 flex items-center justify-center">
						<div class="absolute inset-0 flex items-center justify-center">
							<span class="text-xl font-bold">NEWS</span>
						</div>
						<div class="absolute inset-0 flex items-center justify-center">
							<span class="text-xs tracking-widest" style="transform: rotate(-90deg)">EARLY ACCESS ANALOGUE ASSOCIATION MEMBERSHIP</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div class="mt-6 text-right text-sm">
			<p>ANALOGUE CONTACT BOARD - A-01</p>
		</div>
	</div>
</div>
