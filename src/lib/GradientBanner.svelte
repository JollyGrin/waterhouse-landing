<script lang="ts">
	let { text = 'Are you a DJ in AMS? Apply for Waterhouse Radio - Weekly Streams' } = $props();
</script>

<a href="https://tally.so/r/gDDekK" target="_blank" class="gradient-banner mb-2">
	<div class="banner-content font-jersey">
		{text}
	</div>
</a>

<style>
	.gradient-banner {
		position: relative;
		width: 100%;
		padding: 12px 20px;
		background: linear-gradient(-45deg, #f4d03f, #f39c12, #e67e22, #d68910, #b7950b, #f1c40f);
		background-size: 400% 400%;
		border-bottom: solid 2px;
		animation: gradientMove 8s ease infinite;
		overflow: hidden;
		display: block;
		text-decoration: none;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.gradient-banner:hover {
		transform: translateY(-1px);
	}

	.banner-content {
		text-align: center;
		color: white;
		font-weight: 600;
		font-size: 22px;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		position: relative;
		z-index: 1;
	}

	@keyframes gradientMove {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	@media (max-width: 768px) {
		.banner-content {
			font-size: 14px;
		}

		.gradient-banner {
			padding: 10px 16px;
		}
	}
</style>
