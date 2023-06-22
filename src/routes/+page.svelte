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
				<div class="c2"><Clock /></div>
			</div>
			<div id="weather" class="column c3-flex is-flex">
				<div class="c3"><Weather /></div>
			</div>
		</div>
	</div>
	<div id="bg-info" class="corner-left">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="info-title"
			on:click={() => {
				window.open(`https://bing.com/?q=${image.title}&mkt=${config.mkt}`);
			}}
		>
			{image.title || 'Fetching...'}
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				window.open(`https://bing.com/?q=${image.copyright.split(' (', 1)}&mkt=${config.mkt}`);
			}}
		>
			{image.copyright.split(' (', 1) || ''}
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				window.open(image.copyrightlink);
			}}
		>
			{`${
				image.copyright.replace(`${image.copyright.split(' (', 1)} (`, '').replace(')', '') || ''
			}`}
		</div>
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
