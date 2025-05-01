<script>
  import Turntable from '$lib/Turntable.svelte';
</script>

<div class="container mx-auto py-8">
  <h1 class="text-3xl font-bold mb-6">Turntable with Video Masking</h1>
  
  <div class="max-w-md mx-auto">
    <Turntable 
      videoSrc="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" 
      width="400px"
      height="400px"
    />
  </div>
  
  <div class="mt-8 p-4 bg-gray-100 rounded">
    <h2 class="text-xl font-bold mb-2">How to use:</h2>
    <pre class="bg-gray-800 text-white p-4 rounded">
&lt;Turntable 
  videoSrc="path/to/your/video.mp4" 
  autoplay={true}
  muted={true}
  loop={true}
/&gt;</pre>
  </div>
</div>
