<script lang="ts">
	import { onMount } from 'svelte';
	
	let scrollY = $state(0);
	
	onMount(() => {
		const handleScroll = () => scrollY = window.scrollY;
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<svelte:head>
	<title>Terms of Service - Waterhouse Studios</title>
	<meta name="description" content="Terms of Service for Waterhouse Studios - Music studio rental terms and conditions in Amsterdam" />
</svelte:head>

<svelte:window bind:scrollY />

<main class="min-h-screen bg-black text-white">
	<div class="relative">
		<div class="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-black"></div>
		
		<div class="relative z-10 container mx-auto px-4 py-16">
			<div class="max-w-4xl mx-auto">
				<header class="mb-12 text-center">
					<h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
						Terms of Service
					</h1>
					<p class="text-xl text-gray-300">
						Waterhouse Studios Amsterdam
					</p>
					<p class="text-sm text-gray-500 mt-2">
						Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
					</p>
				</header>

				<div class="prose prose-invert prose-lg max-w-none space-y-8">
					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">1. Agreement to Terms</h2>
						<p class="text-gray-300 leading-relaxed">
							By accessing and using Waterhouse Studios' services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
						</p>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">2. Studio Rental Services</h2>
						<div class="space-y-4 text-gray-300">
							<p><strong>2.1 Booking and Reservations:</strong> All studio bookings must be confirmed in advance. Availability is subject to our schedule and these terms.</p>
							<p><strong>2.2 Payment:</strong> Full payment is required at the time of booking unless otherwise agreed upon in writing.</p>
							<p><strong>2.3 Cancellation Policy:</strong> Cancellations must be made at least 24 hours in advance for a full refund. Same-day cancellations may incur charges.</p>
							<p><strong>2.4 Studio Access:</strong> Access to the studio is limited to booked hours. Early arrival or extended sessions require prior arrangement and may incur additional fees.</p>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">3. User Responsibilities</h2>
						<div class="space-y-4 text-gray-300">
							<p><strong>3.1 Equipment Care:</strong> Users are responsible for the proper use and care of all studio equipment. Any damage will result in repair or replacement charges.</p>
							<p><strong>3.2 Conduct:</strong> Professional and respectful behavior is expected at all times. Disruptive behavior may result in immediate termination of services.</p>
							<p><strong>3.3 Cleanliness:</strong> Users must maintain studio cleanliness and return equipment to designated areas after use.</p>
							<p><strong>3.4 Compliance:</strong> Users must comply with all applicable laws and regulations, including noise ordinances and copyright laws.</p>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">4. Account Registration</h2>
						<div class="space-y-4 text-gray-300">
							<p><strong>4.1 Account Information:</strong> You must provide accurate and complete information when creating an account, including your name and email address.</p>
							<p><strong>4.2 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
							<p><strong>4.3 Account Usage:</strong> Accounts are non-transferable and for individual use only.</p>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">5. Intellectual Property</h2>
						<div class="space-y-4 text-gray-300">
							<p><strong>5.1 Your Content:</strong> You retain ownership of all musical works and recordings created in our studios.</p>
							<p><strong>5.2 Our Content:</strong> All studio branding, equipment, and proprietary materials remain the property of Waterhouse Studios.</p>
							<p><strong>5.3 Usage Rights:</strong> We may use photos or recordings of studio sessions for promotional purposes with your consent.</p>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">6. Liability and Insurance</h2>
						<div class="space-y-4 text-gray-300">
							<p><strong>6.1 Limited Liability:</strong> Waterhouse Studios' liability is limited to the amount paid for services rendered.</p>
							<p><strong>6.2 Equipment Insurance:</strong> Users are liable for any damage to studio equipment during their rental period.</p>
							<p><strong>6.3 Personal Property:</strong> Waterhouse Studios is not responsible for personal items left in the studio.</p>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">7. Termination</h2>
						<p class="text-gray-300 leading-relaxed">
							We reserve the right to terminate or suspend access to our services at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
						</p>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">8. Governing Law</h2>
						<p class="text-gray-300 leading-relaxed">
							These Terms of Service are governed by the laws of the Netherlands. Any disputes will be resolved in the competent courts of Amsterdam.
						</p>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-purple-300">9. Contact Information</h2>
						<div class="text-gray-300">
							<p>For questions about these Terms of Service, please contact us at:</p>
							<p class="mt-2">
								<strong>Waterhouse Studios Amsterdam</strong><br>
								Email: <a href="mailto:info@waterhouse-studios.com" class="text-purple-400 hover:text-purple-300 underline">info@waterhouse-studios.com</a>
							</p>
						</div>
					</section>
				</div>

				<div class="mt-12 text-center">
					<a href="/" class="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200">
						← Back to Home
					</a>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.prose {
		color: inherit;
	}
	
	.prose h2 {
		color: inherit;
	}
	
	.prose p {
		color: inherit;
	}
</style>