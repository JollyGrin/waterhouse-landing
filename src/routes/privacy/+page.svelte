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
	<title>Privacy Policy - Waterhouse Studios</title>
	<meta name="description" content="Privacy Policy for Waterhouse Studios - How we collect, use, and protect your personal information" />
</svelte:head>

<svelte:window bind:scrollY />

<main class="min-h-screen bg-black text-white">
	<div class="relative">
		<div class="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-black"></div>
		
		<div class="relative z-10 container mx-auto px-4 py-16">
			<div class="max-w-4xl mx-auto">
				<header class="mb-12 text-center">
					<h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
						Privacy Policy
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
						<h2 class="text-2xl font-bold mb-4 text-blue-300">1. Introduction</h2>
						<p class="text-gray-300 leading-relaxed">
							At Waterhouse Studios, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our music studio rental services and website.
						</p>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">2. Information We Collect</h2>
						<div class="space-y-4 text-gray-300">
							<div>
								<h3 class="text-lg font-semibold mb-2 text-blue-200">2.1 Personal Information</h3>
								<p>When you create an account or book our services, we collect:</p>
								<ul class="list-disc list-inside mt-2 space-y-1 ml-4">
									<li><strong>Name:</strong> Your full name for account identification and booking purposes</li>
									<li><strong>Email Address:</strong> For account creation, booking confirmations, and communication</li>
									<li><strong>Phone Number:</strong> For booking coordination and emergency contact (when provided)</li>
									<li><strong>Payment Information:</strong> Processed securely through our payment providers</li>
								</ul>
							</div>
							<div>
								<h3 class="text-lg font-semibold mb-2 text-blue-200">2.2 Automatically Collected Information</h3>
								<ul class="list-disc list-inside space-y-1 ml-4">
									<li>IP address and browser information</li>
									<li>Website usage data and analytics</li>
									<li>Device and operating system information</li>
									<li>Cookies and similar technologies (see Cookie Policy below)</li>
								</ul>
							</div>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">3. How We Use Your Information</h2>
						<div class="space-y-4 text-gray-300">
							<p>We use your personal information for the following purposes:</p>
							<ul class="list-disc list-inside space-y-2 ml-4">
								<li><strong>Account Management:</strong> Creating and managing your studio rental account</li>
								<li><strong>Booking Services:</strong> Processing studio reservations and managing your bookings</li>
								<li><strong>Communication:</strong> Sending booking confirmations, updates, and customer support</li>
								<li><strong>Payment Processing:</strong> Handling payments and billing for our services</li>
								<li><strong>Service Improvement:</strong> Analyzing usage patterns to improve our services</li>
								<li><strong>Marketing:</strong> Sending promotional materials (with your consent)</li>
								<li><strong>Legal Compliance:</strong> Meeting legal obligations and protecting our rights</li>
							</ul>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">4. Legal Basis for Processing (GDPR)</h2>
						<div class="space-y-4 text-gray-300">
							<p>Under the General Data Protection Regulation (GDPR), we process your data based on:</p>
							<ul class="list-disc list-inside space-y-2 ml-4">
								<li><strong>Contract Performance:</strong> To fulfill our studio rental services</li>
								<li><strong>Legitimate Interest:</strong> To improve our services and communicate with you</li>
								<li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
								<li><strong>Consent:</strong> For marketing communications (which you can withdraw at any time)</li>
							</ul>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">5. Information Sharing and Disclosure</h2>
						<div class="space-y-4 text-gray-300">
							<p>We do not sell or rent your personal information. We may share your data with:</p>
							<ul class="list-disc list-inside space-y-2 ml-4">
								<li><strong>Service Providers:</strong> Payment processors, email services, and analytics providers</li>
								<li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
								<li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of business assets</li>
								<li><strong>With Your Consent:</strong> For any other purposes with your explicit permission</li>
							</ul>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">6. Data Security</h2>
						<div class="space-y-4 text-gray-300">
							<p>We implement appropriate technical and organizational measures to protect your personal data:</p>
							<ul class="list-disc list-inside space-y-2 ml-4">
								<li>SSL encryption for data transmission</li>
								<li>Secure servers and databases</li>
								<li>Regular security audits and updates</li>
								<li>Limited access to personal data by authorized personnel only</li>
								<li>Data backup and recovery procedures</li>
							</ul>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">7. Your Rights (GDPR)</h2>
						<div class="space-y-4 text-gray-300">
							<p>Under GDPR, you have the following rights regarding your personal data:</p>
							<ul class="list-disc list-inside space-y-2 ml-4">
								<li><strong>Right of Access:</strong> Request a copy of your personal data</li>
								<li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
								<li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
								<li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
								<li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
								<li><strong>Right to Object:</strong> Object to certain types of data processing</li>
								<li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
							</ul>
							<p class="mt-4">To exercise these rights, contact us at <a href="mailto:privacy@waterhouse-studios.com" class="text-blue-400 hover:text-blue-300 underline">privacy@waterhouse-studios.com</a></p>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">8. Data Retention</h2>
						<div class="space-y-4 text-gray-300">
							<p>We retain your personal data for:</p>
							<ul class="list-disc list-inside space-y-2 ml-4">
								<li><strong>Account Data:</strong> As long as your account is active or as needed for services</li>
								<li><strong>Booking History:</strong> Up to 7 years for legal and tax purposes</li>
								<li><strong>Marketing Data:</strong> Until you unsubscribe or withdraw consent</li>
								<li><strong>Analytics Data:</strong> In anonymized form for statistical analysis</li>
							</ul>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">9. Cookies and Tracking</h2>
						<div class="space-y-4 text-gray-300">
							<p>We use cookies and similar technologies to:</p>
							<ul class="list-disc list-inside space-y-2 ml-4">
								<li>Remember your preferences and login status</li>
								<li>Analyze website traffic and user behavior</li>
								<li>Provide personalized content and advertisements</li>
								<li>Improve website functionality and performance</li>
							</ul>
							<p class="mt-4">You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>
						</div>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">10. Third-Party Links</h2>
						<p class="text-gray-300 leading-relaxed">
							Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
						</p>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">11. Children's Privacy</h2>
						<p class="text-gray-300 leading-relaxed">
							Our services are not directed to children under 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal data from a child under 16, we will take steps to delete such information.
						</p>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">12. International Data Transfers</h2>
						<p class="text-gray-300 leading-relaxed">
							Your data may be transferred to and processed in countries outside the European Economic Area (EEA). We ensure appropriate safeguards are in place to protect your data in accordance with GDPR requirements.
						</p>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">13. Changes to This Policy</h2>
						<p class="text-gray-300 leading-relaxed">
							We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
						</p>
					</section>

					<section class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
						<h2 class="text-2xl font-bold mb-4 text-blue-300">14. Contact Us</h2>
						<div class="text-gray-300">
							<p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
							<div class="mt-4 space-y-2">
								<p><strong>Waterhouse Studios Amsterdam</strong></p>
								<p>Email: <a href="mailto:privacy@waterhouse-studios.com" class="text-blue-400 hover:text-blue-300 underline">privacy@waterhouse-studios.com</a></p>
								<p>General inquiries: <a href="mailto:info@waterhouse-studios.com" class="text-blue-400 hover:text-blue-300 underline">info@waterhouse-studios.com</a></p>
								<p>Data Protection Officer: <a href="mailto:dpo@waterhouse-studios.com" class="text-blue-400 hover:text-blue-300 underline">dpo@waterhouse-studios.com</a></p>
							</div>
						</div>
					</section>
				</div>

				<div class="mt-12 text-center">
					<a href="/" class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
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
	
	.prose h2,
	.prose h3 {
		color: inherit;
	}
	
	.prose p,
	.prose ul,
	.prose li {
		color: inherit;
	}
</style>