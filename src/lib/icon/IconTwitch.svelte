<script>
    export let w = 200;
    $: width = w;
    $: height = w;
</script>

<svg
    {width}
    {height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...$$props}
>
    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7M16 11V7" />
</svg>

<style>
    svg {
        color: inherit;
    }
</style>