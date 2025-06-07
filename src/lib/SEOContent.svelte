<script lang="ts">
// This component displays modal content in a way that search engines can index it,
// but it's visually hidden for human visitors
let { content } = $props();
</script>

<!-- Content visible to search engines but hidden visually -->
<div class="seo-content">
  {content}
</div>

<style>
  /* Hidden visually but available to search engines */
  .seo-content {
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
