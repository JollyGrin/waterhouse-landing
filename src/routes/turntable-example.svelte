<script>
	import Turntable from '$lib/Turntable.svelte';
</script>

<div class="container mx-auto py-8">
	<h1 class="mb-6 text-3xl font-bold">Turntable with Video Masking</h1>

	<div class="mx-auto hidden max-w-md md:block">
		<Turntable
			videoSrc="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
			width="400px"
			height="400px"
		/>
	</div>

	<div class="mt-8 rounded bg-gray-100 p-4">
		<h2 class="mb-2 text-xl font-bold">How to use:</h2>
		<pre class="rounded bg-gray-800 p-4 text-white">
&lt;Turntable 
  videoSrc="path/to/your/video.mp4" 
  autoplay={true}
  muted={true}
  loop={true}
/&gt;</pre>
	</div>
</div>
