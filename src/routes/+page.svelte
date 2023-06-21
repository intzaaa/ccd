<script>
	import 'bulma/css/bulma.min.css';
	import '@ibm/plex/css/ibm-plex.min.css';
	import Clock from './Clock.svelte';
	import Countdown from './Countdown.svelte';
	import Weather from './Weather.svelte';
	import Contact from './Control.svelte';
	import FetchImage from './FetchImage';
	import config from '../config/image.config';
	let image = config.format;
	FetchImage().then((result) => {
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
	body {
		width: 100vw;
		height: 100vh;
		background-color: black;
		background-position: center;
		background-size: cover;
		overflow: hidden !important;
	}
	::global(*) {
		margin: 0;
		padding: 0;
	}
	.is-flex {
		height: 100vh;
		flex-wrap: wrap;
		align-content: center;
		flex-shrink: 0;
	}
	.left-flex {
		justify-content: right;
	}
	.center {
		justify-content: center;
	}
	.left {
		margin-right: 1rem !important;
		transform: perspective(7.5rem) rotateY(7.5deg);
		transform-origin: right;
		perspective-origin: right;
	}
	.right {
		margin-left: 1rem !important;
		transform: perspective(7.5rem) rotateY(-7.5deg);
		transform-origin: left;
		perspective-origin: left;
	}
	.corner-left {
		position: absolute;
		left: 0.8rem;
		bottom: 0.5rem;
		font-family: 'IBM Plex Sans';
		font-weight: 400;
		color: rgba(255, 255, 255, 0.75);
		border-left: solid 0.1em rgba(255, 255, 255, 0.75);
		padding-left: 0.5em !important;
		font-family: 'IBM Plex Sans JP', 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.corner-right {
		position: absolute;
		right: 0.8rem;
		bottom: 0.5rem;
		font-family: 'IBM Plex Sans';
		font-weight: 400;
		color: rgba(255, 255, 255, 0.75);
		border-right: solid 0.1em rgba(255, 255, 255, 0.75);
		padding-right: 0.5em !important;
		font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		text-align: right;
	}
</style>
