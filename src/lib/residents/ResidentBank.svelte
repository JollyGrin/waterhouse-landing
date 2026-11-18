<script lang="ts">
	import { RESIDENTS, type Resident } from './residents';

	let selectedIndex = $state(0);
	let selected: Resident = $derived(RESIDENTS[selectedIndex]);
	let userTookControl = $state(false);

	// Sequencer-style auto-advance: step through the pads until the user
	// takes over, like a pattern playing on the machine above.
	$effect(() => {
		if (userTookControl) return;
		const interval = setInterval(() => {
			selectedIndex = (selectedIndex + 1) % RESIDENTS.length;
		}, 4500);
		return () => clearInterval(interval);
	});

	function selectPad(i: number) {
		userTookControl = true;
		selectedIndex = i;
	}

	function padLabel(i: number) {
		return `${String.fromCharCode(65 + Math.floor(i / 4))}${(i % 4) + 1}`;
	}

	function formatDate(iso: string) {
		const d = new Date(iso);
		const dd = String(d.getDate()).padStart(2, '0');
		const mm = String(d.getMonth() + 1).padStart(2, '0');
		const yy = String(d.getFullYear()).slice(2);
		return `${dd}·${mm}·${yy}`;
	}
</script>

<section class="resident-cabinet font-jersey container mx-auto mt-6" aria-label="Resident artists">
	<div class="rack relative w-full overflow-hidden rounded-xl border-2 bg-slate-50">
		<!-- Hardware corner rivets -->
		<span class="rivet rivet-tl" aria-hidden="true"></span>
		<span class="rivet rivet-tr" aria-hidden="true"></span>
		<span class="rivet rivet-bl" aria-hidden="true"></span>
		<span class="rivet rivet-br" aria-hidden="true"></span>

		<!-- Top strip -->
		<div class="rack-strip strip-top">
			<div class="strip-cell">
				<span class="led led-power" aria-hidden="true"></span>
				<span class="hidden sm:inline">POWER</span>
			</div>
			<div class="strip-cell strip-center">
				<h2 class="strip-brand">RESIDENT BANK</h2>
				<span class="strip-sep">·</span>
				<span>WH—R16</span>
				<span class="strip-sep hidden md:inline">·</span>
				<span class="hidden md:inline">SAMPLER EXPANSION</span>
				<span class="strip-sep hidden sm:inline">·</span>
				<span class="hidden sm:inline">{RESIDENTS.length} SLOTS LOADED</span>
			</div>
			<div class="strip-cell">
				<span class="hidden sm:inline">LINK</span>
				<span class="jack" aria-hidden="true"></span>
			</div>
		</div>

		<div class="rack-body">
			<!-- LCD readout: the loaded artist -->
			<div class="lcd relative overflow-hidden rounded">
				{#key selected.id}
					<div class="lcd-content">
						<div class="lcd-topline">
							<span class="flex items-center gap-1.5">
								<span class="led-loaded" aria-hidden="true"></span>
								<span>LOADED</span>
							</span>
							<span>SLOT {padLabel(selectedIndex)}</span>
							<span class="hidden sm:inline">{selected.genre.toUpperCase()}</span>
						</div>

						<div class="lcd-main">
							<div class="lcd-photo" aria-hidden="true">
								<img src={selected.photo} alt="" loading="lazy" />
								<span class="lcd-photo-tint"></span>
							</div>
							<div class="lcd-info">
								<h3 class="lcd-name">{selected.name}</h3>
								<span class="lcd-genre">{selected.genre}</span>
								<p class="lcd-desc">{selected.description}</p>
								<div class="lcd-ports">
									{#each selected.socials as social (social.kind)}
										<a class="port" href={social.url} target="_blank" rel="noopener noreferrer">
											<span class="port-kind">{social.kind}</span>
											<span class="port-handle">{social.handle}</span>
										</a>
									{/each}
								</div>
							</div>
						</div>

						<div class="lcd-log">
							<div class="lcd-log-title">SESSION LOG — SHOWS AT WATERHOUSE</div>
							{#each selected.shows as show (show.date + show.title)}
								<div class="lcd-log-row">
									<span class="log-date">{formatDate(show.date)}</span>
									<span class="log-dots" aria-hidden="true"></span>
									<span class="log-title">{show.title}</span>
									{#if show.room}
										<span class="log-room">{show.room}</span>
									{/if}
								</div>
							{/each}
							<span class="lcd-cursor" aria-hidden="true">▌</span>
						</div>
					</div>
				{/key}
				<div class="lcd-scan pointer-events-none absolute inset-0" aria-hidden="true"></div>
				<div class="lcd-glow pointer-events-none absolute inset-0 rounded" aria-hidden="true"></div>
			</div>

			<!-- Pad bank -->
			<div class="pads">
				{#each RESIDENTS as resident, i (resident.id)}
					<button
						class="pad"
						class:pad-active={i === selectedIndex}
						onclick={() => selectPad(i)}
						aria-pressed={i === selectedIndex}
						aria-label="Load resident {resident.name}"
					>
						<span class="pad-slot">{padLabel(i)}</span>
						<span class="pad-led" class:lit={i === selectedIndex} aria-hidden="true"></span>
						<img class="pad-photo" src={resident.photo} alt="" loading="lazy" />
						<span class="pad-strip">
							<span class="pad-name">{resident.name}</span>
							<span class="pad-genre">{resident.genre}</span>
						</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Bottom strip -->
		<div class="rack-strip strip-bottom">
			<span class="hidden sm:inline">{RESIDENTS.length} ARTISTS IN RESIDENCE</span>
			<span class="strip-sep hidden sm:inline">—</span>
			<span>HOUTHAVEN · AMSTERDAM</span>
			<span class="strip-sep">—</span>
			<a href="/residency" class="strip-link">JOIN THE RESIDENCY ↗</a>
		</div>
	</div>
</section>

<style>
	.rack {
		position: relative;
		z-index: 2;
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 1) inset,
			0 -1px 0 rgba(0, 0, 0, 0.05) inset,
			0 20px 40px -24px rgba(0, 0, 0, 0.25),
			0 2px 0 rgba(0, 0, 0, 0.08);
	}

	/* ----- Shared machine chrome (matches WH-08 above) ----- */
	.rivet {
		position: absolute;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, #888 0%, #3a3a3a 50%, #181818 100%);
		box-shadow:
			0 1px 1px rgba(255, 255, 255, 0.7),
			inset 0 -1px 1px rgba(0, 0, 0, 0.6),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
		z-index: 4;
	}
	.rivet-tl {
		top: 7px;
		left: 7px;
	}
	.rivet-tr {
		top: 7px;
		right: 7px;
	}
	.rivet-bl {
		bottom: 7px;
		left: 7px;
	}
	.rivet-br {
		bottom: 7px;
		right: 7px;
	}

	.rack-strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 6px 32px;
		font-size: 0.65rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0.55);
		font-family: var(--font-jersey);
	}
	.strip-top {
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), transparent);
	}
	.strip-bottom {
		justify-content: center;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), transparent);
		gap: 16px;
		font-size: 0.6rem;
	}
	.strip-cell {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.strip-brand {
		font-weight: bold;
		letter-spacing: 0.32em;
		color: #000;
		font-size: inherit;
	}
	.strip-sep {
		opacity: 0.35;
	}
	.strip-link {
		color: var(--color-amber);
		text-shadow: 0 0 4px rgba(255, 140, 26, 0.35);
	}
	.strip-link:hover {
		text-decoration: underline;
	}
	.jack {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, #555 0%, #1a1a1a 60%, #000 100%);
		box-shadow:
			inset 0 0 0 1px rgba(0, 0, 0, 0.7),
			inset 0 1px 2px rgba(255, 255, 255, 0.12),
			0 1px 0 rgba(255, 255, 255, 0.5);
		display: inline-block;
	}
	.led {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	.led-power {
		background: radial-gradient(
			circle at 30% 30%,
			#fff2c8 0%,
			var(--color-amber) 55%,
			#b85800 100%
		);
		box-shadow:
			0 0 6px rgba(255, 140, 26, 0.75),
			inset 0 -1px 1px rgba(0, 0, 0, 0.3);
		animation: rb-heartbeat 0.667s ease-in-out infinite;
	}
	@keyframes rb-heartbeat {
		0%,
		60%,
		100% {
			opacity: 0.55;
		}
		8%,
		20% {
			opacity: 1;
		}
	}

	/* ----- Body layout ----- */
	.rack-body {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: 12px;
		padding: 12px;
	}
	@media (max-width: 767px) {
		.rack-body {
			grid-template-columns: 1fr;
		}
	}

	/* ----- LCD readout ----- */
	.lcd {
		background: radial-gradient(ellipse at center, #11161d 0%, #060809 100%);
		border: 1.5px solid #000;
		box-shadow:
			inset 0 0 0 1px rgba(255, 154, 60, 0.05),
			inset 0 0 24px rgba(255, 140, 26, 0.18),
			inset 0 0 80px rgba(0, 0, 0, 0.8),
			0 0 0 2px rgba(0, 0, 0, 0.1);
		color: #ffa340;
		font-family: var(--font-jersey);
		text-shadow:
			0 0 4px rgba(255, 140, 26, 0.7),
			0 0 8px rgba(255, 140, 26, 0.3);
		min-height: 340px;
		display: grid;
	}
	.lcd-content {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 12px 14px;
		animation: lcd-load 0.35s ease-out;
	}
	@keyframes lcd-load {
		0% {
			opacity: 0;
			filter: brightness(2.2) blur(1px);
			transform: translateY(2px);
		}
		100% {
			opacity: 1;
			filter: brightness(1) blur(0);
			transform: translateY(0);
		}
	}
	.lcd-topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.6rem;
		letter-spacing: 0.18em;
		opacity: 0.85;
	}
	.led-loaded {
		display: inline-block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-amber);
		box-shadow: 0 0 6px rgba(255, 140, 26, 0.8);
		animation: rb-heartbeat 1.334s ease-in-out infinite;
	}
	.lcd-main {
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}
	.lcd-photo {
		position: relative;
		flex-shrink: 0;
		width: clamp(104px, 11vw, 150px);
		height: clamp(104px, 11vw, 150px);
		border: 1px solid rgba(255, 163, 64, 0.4);
		border-radius: 2px;
		overflow: hidden;
	}
	.lcd-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(1) contrast(1.15) brightness(0.85);
	}
	.lcd-photo-tint {
		position: absolute;
		inset: 0;
		background: rgba(255, 140, 26, 0.35);
		mix-blend-mode: color;
	}
	.lcd-photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.25) 0px,
			rgba(0, 0, 0, 0.25) 1px,
			transparent 1px,
			transparent 3px
		);
	}
	.lcd-info {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.lcd-name {
		font-size: clamp(1.7rem, 2.2vw, 2.2rem);
		line-height: 1;
		letter-spacing: 0.04em;
		color: #ffb35c;
		text-shadow:
			0 0 6px rgba(255, 140, 26, 0.8),
			0 0 16px rgba(255, 140, 26, 0.35);
	}
	.lcd-genre {
		align-self: flex-start;
		border: 1px solid rgba(255, 163, 64, 0.55);
		border-radius: 2px;
		padding: 1px 7px;
		font-size: 0.6rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}
	.lcd-desc {
		font-size: 0.85rem;
		line-height: 1.35;
		opacity: 0.8;
		letter-spacing: 0.02em;
	}
	.lcd-ports {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 2px;
	}
	.port {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		border: 1px solid rgba(255, 163, 64, 0.35);
		border-radius: 2px;
		padding: 2px 6px;
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		transition: all 0.15s ease;
	}
	.port:hover {
		border-color: rgba(255, 163, 64, 0.9);
		background: rgba(255, 140, 26, 0.12);
	}
	.port-kind {
		font-weight: bold;
		letter-spacing: 0.2em;
		opacity: 0.7;
	}

	/* Session log */
	.lcd-log {
		margin-top: auto;
		border-top: 1px dashed rgba(255, 163, 64, 0.3);
		padding-top: 8px;
		font-size: 0.7rem;
	}
	.lcd-log-title {
		font-size: 0.55rem;
		letter-spacing: 0.22em;
		opacity: 0.6;
		margin-bottom: 5px;
	}
	.lcd-log-row {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding: 1.5px 0;
		white-space: nowrap;
	}
	.log-date {
		flex-shrink: 0;
		opacity: 0.65;
		letter-spacing: 0.08em;
	}
	.log-dots {
		flex: 1;
		min-width: 12px;
		border-bottom: 1px dotted rgba(255, 163, 64, 0.3);
		transform: translateY(-3px);
	}
	.log-title {
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.log-room {
		flex-shrink: 0;
		font-size: 0.55rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.55;
	}
	.lcd-cursor {
		display: inline-block;
		animation: rb-blink 1s steps(1) infinite;
		font-size: 0.7rem;
	}
	@keyframes rb-blink {
		50% {
			opacity: 0;
		}
	}

	/* LCD overlays */
	.lcd-scan {
		background-image: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.32) 0px,
			rgba(0, 0, 0, 0.32) 1px,
			transparent 1px,
			transparent 3px
		);
		mix-blend-mode: multiply;
		opacity: 0.85;
	}
	.lcd-glow {
		box-shadow:
			inset 0 0 30px rgba(255, 154, 60, 0.2),
			inset 0 0 120px rgba(0, 0, 0, 0.45);
	}

	/* ----- Pad bank ----- */
	.pads {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: 1fr;
		gap: 10px;
	}
	@media (max-width: 479px) {
		.pads {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.pad {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		aspect-ratio: 1 / 1.1;
		border: 2px solid black;
		border-radius: 0.5rem;
		background: linear-gradient(180deg, #ffffff 0%, #efece6 100%);
		box-shadow:
			3px 3px 0 black,
			inset 0 1px 0 rgba(255, 255, 255, 0.95),
			inset 0 -8px 12px -8px rgba(0, 0, 0, 0.18);
		transition: all 0.18s ease;
		cursor: pointer;
		padding: 0;
	}
	.pad:hover {
		transform: translate(2px, 2px);
		box-shadow:
			1px 1px 0 black,
			inset 0 1px 0 rgba(255, 255, 255, 0.95),
			inset 0 -8px 12px -8px rgba(0, 0, 0, 0.18);
	}
	.pad:active {
		transform: translate(3px, 3px);
		box-shadow:
			0 0 0 black,
			inset 0 2px 6px rgba(0, 0, 0, 0.18);
	}
	.pad-active {
		box-shadow:
			3px 3px 0 black,
			0 0 0 3px rgba(255, 140, 26, 0.55),
			0 0 14px rgba(255, 140, 26, 0.45);
	}
	.pad-slot {
		position: absolute;
		top: 5px;
		left: 7px;
		z-index: 2;
		font-size: 0.55rem;
		letter-spacing: 0.2em;
		font-family: var(--font-jersey);
		color: #fff;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
		line-height: 1;
		pointer-events: none;
	}
	.pad-led {
		position: absolute;
		top: 5px;
		right: 7px;
		z-index: 2;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.4);
	}
	.pad-led.lit {
		background: var(--color-amber);
		box-shadow: 0 0 6px rgba(255, 140, 26, 0.9);
		animation: rb-heartbeat 0.667s ease-in-out infinite;
	}
	.pad-photo {
		width: 100%;
		flex: 1;
		min-height: 0;
		object-fit: cover;
		filter: grayscale(1) contrast(1.05);
		transition: filter 0.25s ease;
	}
	.pad:hover .pad-photo,
	.pad-active .pad-photo {
		filter: grayscale(0) saturate(1.1);
	}
	.pad-strip {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0;
		padding: 3px 7px 4px;
		border-top: 2px solid black;
		background: linear-gradient(180deg, #ffffff 0%, #efece6 100%);
		font-family: var(--font-jersey);
		text-align: left;
	}
	.pad-name {
		font-size: 0.78rem;
		line-height: 1.1;
		color: #000;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}
	.pad-genre {
		font-size: 0.5rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		opacity: 0.5;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}
</style>
