<script>
	import 'bulma/bulma.sass';
	import '@ibm/plex/css/ibm-plex.min.css';
	import './+page.scss';
	import Clock from './Clock.svelte';
	import Countdown from './Countdown.svelte';
	import Weather from './Weather.svelte';
	import Contact from './Control.svelte';
	import FetchImage from './FetchImage';
	import config from '../config/image.config';
	let image = config.format;
	FetchImage().then((result) => {
		console.log(result);
		image = Object(result);
	});
	let fresh = setInterval(() => {
		FetchImage().then((result) => {
			image = Object(result);
		});
	}, 3600000);
</script>

<svelte:head>
	<title>CCD (Countdown, Clock, and Weather)</title>
</svelte:head>

<body style="background-image: url({image.base64 || ''})">
	<div id="main">
		<div class="columns">
			<div id="countdown" class="column left-flex is-flex">
				<div class="left top"><Countdown /></div>
			</div>
			<div id="clock" class="column center is-flex">
				<div class="center"><Clock /></div>
			</div>
			<div id="weather" class="column right-flex is-flex">
				<div class="right bottom"><Weather /></div>
			</div>
		</div>
	</div>
	{#if image.base64}
		<div id="bg-info" class="corner-left">
			<div><b>{image.title}</b></div>
			<div>{image.copyright.split(' (', 1)}</div>
			<div>{String(image.copyright.split(' (', 2)[1]).split(')', 1)}</div>
		</div>
	{/if}
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
