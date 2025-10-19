<script lang="ts">
	import { LINEUP } from './constants';
	import IconTwitch from '$lib/icon/IconTwitch.svelte';

	// Group events by date
	const eventsByDate = LINEUP.reduce(
		(acc, event) => {
			const dateKey = event.date.toDateString();
			if (!acc[dateKey]) {
				acc[dateKey] = [];
			}
			acc[dateKey].push(event);
			return acc;
		},
		{} as Record<string, typeof LINEUP>
	);

	// Format time from military to display format
	function formatTime(time: number): string {
		const hours = Math.floor(time / 100);
		const minutes = time % 100;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}

	// Format date for display
	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		});
	}

	// Get Instagram URL from either username or full URL
	function getInstagramUrl(instagram: string | undefined): string | null {
		if (!instagram) return null;

		// If it's already a full URL, return it
		if (instagram.startsWith('http')) {
			return instagram;
		}

		// Otherwise, construct the URL from username
		return `https://instagram.com/${instagram}`;
	}
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>ADE 2025 - Waterhouse Stream Marathon</title>
	<meta
		name="description"
		content="4-day Twitch stream marathon during Amsterdam Dance Event. Oct 22-25 featuring underground electronic music artists at the new Waterhouse Studios in Amsterdam."
	/>

	<!-- Open Graph Meta Tags -->
	<meta property="og:url" content="https://waterhousestudios.nl/ade" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="ADE 2025 - Waterhouse Stream Marathon" />
	<meta
		property="og:description"
		content="4-day Twitch stream marathon during Amsterdam Dance Event. Oct 22-25 featuring underground electronic music artists at the new Waterhouse Studios in Amsterdam."
	/>
	<meta
		property="og:image"
		content="https://waterhousestudios.nl/ADE_OG.png"
	/><!-- Load error, please check URL -->

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="waterhousestudios.nl" />
	<meta property="twitter:url" content="https://waterhousestudios.nl/ade" />
	<meta name="twitter:title" content="ADE 2025 - Waterhouse Stream Marathon" />
	<meta
		name="twitter:description"
		content="4-day Twitch stream marathon during Amsterdam Dance Event. Oct 22-25 featuring underground electronic music artists at the new Waterhouse Studios in Amsterdam."
	/>
	<meta name="twitter:image" content="https://waterhousestudios.nl/ADE_OG.png" />
	<meta name="author" content="Waterhouse Studios" />
</svelte:head>

<div class="font-jersey container">
	<a
		href="https://twitch.tv/waterhousestudios"
		target="_blank"
		rel="noopener noreferrer"
		class="twitch-banner"
	>
		<IconTwitch w={24} />
		<span>Watch Live on Twitch</span>
	</a>

	<header>
		<h1>ADE 2025</h1>
		<p class="subtitle">Waterhouse Stream Marathon</p>
	</header>

	<main>
		{#each Object.entries(eventsByDate) as [dateString, events]}
			<section class="day-section">
				<h2 class="date-header">{formatDate(events[0].date)}</h2>

				<div class="events-list">
					{#each events as event}
						<article class="event-card">
							<div class="time-slot">
								<span class="time">{formatTime(event.startTime)}</span>
								<span class="duration-line"></span>
								<span class="time">{formatTime(event.endTime)}</span>
							</div>

							<div class="event-info">
								<div class="artist-header">
									{#if event.profilePhotoUrl}
										<img src={event.profilePhotoUrl} alt={event.artist} class="profile-photo" />
									{/if}
									<h3 class="artist-name">{event.artist}</h3>
								</div>

								{#if event.portfolioUrl || event.instagram}
									<div class="links">
										{#if event.portfolioUrl}
											<a
												href={event.portfolioUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="link link-portfolio"
											>
												<span class="link-icon">🎵</span>
												<span>Portfolio</span>
											</a>
										{/if}
										{#if event.instagram}
											{@const instagramUrl = getInstagramUrl(event.instagram)}
											{#if instagramUrl}
												<a
													href={instagramUrl}
													target="_blank"
													rel="noopener noreferrer"
													class="link link-instagram"
												>
													<span class="link-icon">📸</span>
													<span>Instagram</span>
												</a>
											{/if}
										{/if}
									</div>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/each}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	.container {
		min-height: 100vh;
		background-color: #000000;
		color: #ffffff;
		padding: 0;
		margin: 0;
		width: 100vw;
		max-width: 100%;
	}

	.twitch-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		background: #ffed00;
		color: #000000;
		padding: 0.75rem 1rem;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: all 0.2s ease;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.twitch-banner:hover {
		background: #000000;
		color: #ffed00;
		border-bottom: 2px solid #ffed00;
	}

	.twitch-banner span {
		margin-top: 2px;
	}

	header {
		padding: 2rem 1rem;
		text-align: center;
		background: #000000;
		border-bottom: 2px solid #ffed00;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 900;
		margin: 0;
		color: #ffed00;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.subtitle {
		font-size: 1.125rem;
		color: #999;
		margin: 0.5rem 0 0 0;
		font-weight: 300;
	}

	main {
		padding: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.day-section {
		margin-bottom: 3rem;
	}

	.date-header {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1.5rem 0;
		color: #ffed00;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.events-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.event-card {
		background: #0a0a0a;
		border: 1px solid #222;
		border-radius: 8px;
		padding: 1.25rem;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.5rem;
		transition: all 0.2s ease;
	}

	.event-card:hover {
		background: #111;
		border-color: #ffed00;
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(255, 237, 0, 0.15);
	}

	.time-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.time {
		font-size: 1.75rem;
		font-weight: 200;
		color: #ffed00;
		font-variant-numeric: tabular-nums;
	}

	.duration-line {
		width: 2px;
		height: 20px;
		background: #ffed00;
	}

	.event-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
		min-width: 0;
	}

	.artist-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.profile-photo {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid #222;
		flex-shrink: 0;
	}

	.artist-name {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0;
		color: #ffffff;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.links {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 0.75rem;
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #fff;
		background: #222;
		padding: 0.5rem 0.875rem;
		border-radius: 6px;
		text-decoration: none;
		transition: all 0.2s ease;
		border: 1px solid #333;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.link:hover {
		background: #ffed00;
		color: #000;
		border-color: #ffed00;
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(255, 237, 0, 0.3);
	}

	.link-icon {
		font-size: 1rem;
	}

	.link-portfolio:hover {
		background: #ffed00;
		color: #000;
	}

	.link-instagram:hover {
		background: linear-gradient(135deg, #833ab4, #fd1d1d, #f77737);
		color: #fff;
		border-color: #833ab4;
	}

	/* Tablet and larger screens */
	@media (min-width: 768px) {
		.twitch-banner {
			font-size: 1rem;
			padding: 1rem 1.5rem;
		}

		header {
			padding: 3rem 2rem;
		}

		h1 {
			font-size: 3.5rem;
		}

		.subtitle {
			font-size: 1.25rem;
		}

		main {
			padding: 2rem;
			max-width: 800px;
		}

		.date-header {
			font-size: 1.5rem;
			margin-bottom: 2rem;
		}

		.events-list {
			gap: 1.25rem;
		}

		.event-card {
			padding: 1.5rem;
		}

		.profile-photo {
			width: 48px;
			height: 48px;
		}

		/* .artist-name { */
		/* 	font-size: 1.25rem; */
		/* } */

		.link {
			font-size: 0.9375rem;
			padding: 0.625rem 1rem;
		}

		.links {
			gap: 1rem;
		}
	}

	/* Desktop screens */
	@media (min-width: 1024px) {
		main {
			max-width: 900px;
		}

		.event-card {
			padding: 1.75rem;
		}
	}
</style>
