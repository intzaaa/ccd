<script>
	import localForage from 'localforage';
	import 'bulma/bulma.sass';
	import '@ibm/plex/css/ibm-plex.min.css';
	import './+page.scss';
	import Clock from './Clock.svelte';
	import Countdown from './Countdown.svelte';
	import Weather from './Weather.svelte';
	import Contact from './Contact.svelte';
	import FetchImage from './FetchImage';
	import Quote from './Quote.svelte';
	import config from '../config/image.config';
	let image = config.format;
	localForage.getItem('image').then((result) => {
		image = result;
	});
	FetchImage().then((result) => {
		console.log(result);
		image = Object(result);
	});
	setInterval(() => {
		FetchImage().then((result) => {
			image = Object(result);
		});
	}, 1800000);
</script>

<svelte:head>
	<title>CCD (Countdown, Clock, and Weather)</title>
</svelte:head>

<body style="background-image: url({image.base64 || ''})">
	<div id="main" class="main is-flex">
		<div class="columns">
			<div id="countdown" class="column c1-flex is-flex">
				<div class="c1"><Countdown /></div>
			</div>
			<div id="clock" class="column c2 is-flex">
				<div class="c2">
					<Clock />
				</div>
			</div>
			<div id="weather" class="column c3-flex is-flex">
				<div class="c3"><Weather /></div>
			</div>
		</div>
	</div>
	<div class="image-info">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div>
			{image.copyright.split(' (', 1) || ''}
		</div>
	</div>
	<div class="corner-left">
		<Quote />
	</div>
	<div id="contact" class="corner-right">
		<Contact />
	</div>
</body>

<style>
	:global(*) {
		margin: 0 !important;
		padding: 0 !important;
	}
</style>
