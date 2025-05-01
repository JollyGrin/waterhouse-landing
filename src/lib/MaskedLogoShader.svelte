<script lang="ts">
  import IconLogo from '$lib/icon/IconLogo.svelte';
  import ShaderCanvas from '$lib/shader/ShaderCanvas.svelte';
  import { shaderConfigWarpGrid } from '$lib/shader/shaders/shader-warpgrid';
  import { onMount } from 'svelte';
  
  let { width = '100%', height = '100%', shader = shaderConfigWarpGrid } = $props();
  let logoSvgUrl = $state('');
  let logoContainerRef: HTMLDivElement;

  // Generate data URL from the SVG to use as mask
  onMount(() => {
    if (logoContainerRef) {
      const svgElement = logoContainerRef.querySelector('svg');
      if (svgElement) {
        const svgContent = svgElement.outerHTML;
        const encodedSvg = encodeURIComponent(svgContent);
        logoSvgUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
      }
    }
  });
</script>

<div class="masked-shader" style:width={width} style:height={height}>
  <!-- Hidden container to render the SVG -->
  <div bind:this={logoContainerRef} class="hidden">
    <IconLogo />
  </div>
  
  <!-- Shader canvas with mask applied -->
  <div class="shader-container" style={logoSvgUrl ? `-webkit-mask-image: url('${logoSvgUrl}'); mask-image: url('${logoSvgUrl}')` : ''}>
    <ShaderCanvas {shader} />
  </div>
</div>

<style>
  .masked-shader {
    position: relative;
    overflow: hidden;
  }
  
  .hidden {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    width: 0;
    height: 0;
    overflow: hidden;
  }
  
  .shader-container {
    width: 100%;
    height: 100%;
    -webkit-mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }
</style>
