<script lang="ts">
	import { LINEUP } from './constants';
	
	// Group events by date
	const eventsByDate = LINEUP.reduce((acc, event) => {
		const dateKey = event.date.toDateString();
		if (!acc[dateKey]) {
			acc[dateKey] = [];
		}
		acc[dateKey].push(event);
		return acc;
	}, {} as Record<string, typeof LINEUP>);
	
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
</script>

<div class="container">
	<header>
		<h1>ADE 2025</h1>
		<p class="subtitle">Twitch Stream Marathon</p>
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
								<h3 class="artist-name">{event.artist}</h3>
								
								{#if event.portfolioUrl || event.instagram}
									<div class="links">
										{#if event.portfolioUrl}
											<a href={event.portfolioUrl} target="_blank" rel="noopener noreferrer" class="link">
												Portfolio
											</a>
										{/if}
										{#if event.instagram}
											<a href={`https://instagram.com/${event.instagram}`} target="_blank" rel="noopener noreferrer" class="link">
												Instagram
											</a>
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
	.container {
		min-height: 100vh;
		background-color: #0a0a0a;
		color: #ffffff;
		padding: 0;
		margin: 0;
	}
	
	header {
		padding: 2rem 1rem;
		text-align: center;
		background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
		border-bottom: 1px solid #333;
	}
	
	h1 {
		font-size: 2.5rem;
		font-weight: 900;
		margin: 0;
		background: linear-gradient(135deg, #ff0080, #ff8c00);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}
	
	.subtitle {
		font-size: 1.125rem;
		color: #888;
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
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0 0 1.5rem 0;
		color: #ff0080;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	
	.events-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.event-card {
		background: #1a1a1a;
		border: 1px solid #333;
		border-radius: 12px;
		padding: 1.25rem;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.5rem;
		transition: all 0.2s ease;
	}
	
	.event-card:hover {
		background: #222;
		border-color: #ff0080;
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(255, 0, 128, 0.2);
	}
	
	.time-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	
	.time {
		font-size: 0.875rem;
		font-weight: 600;
		color: #ff8c00;
		font-variant-numeric: tabular-nums;
	}
	
	.duration-line {
		width: 2px;
		height: 20px;
		background: linear-gradient(180deg, #ff8c00, #ff0080);
	}
	
	.event-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
		min-width: 0;
	}
	
	.artist-name {
		font-size: 1.125rem;
		font-weight: 700;
		margin: 0;
		color: #ffffff;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	
	.link {
		font-size: 0.875rem;
		color: #888;
		text-decoration: none;
		transition: color 0.2s ease;
		border-bottom: 1px solid transparent;
	}
	
	.link:hover {
		color: #ff0080;
		border-bottom-color: #ff0080;
	}
	
	/* Tablet and larger screens */
	@media (min-width: 768px) {
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
		
		.artist-name {
			font-size: 1.25rem;
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