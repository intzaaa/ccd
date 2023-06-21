<script>
	import 'bulma/css/bulma.min.css';
	import '@ibm/plex/css/ibm-plex.min.css';
	import Clock from './Clock.svelte';
	import Countdown from './Countdown.svelte';
	import Weather from './Weather.svelte';
	import localForage from 'localforage';
	let bg = {
		startdate: '19700000',
		copyright: '',
		urlbase: '/',
		title: '',
		url: '/',
		base64: ''
	};
	async function getBackgroundImage() {
		bg = Object(await localForage.getItem('bg'));
		let url = 'https://bw.recollect.top/HPImageArchive.aspx?format=js&idx=0&n=10&mkt=ja-JP';
		let data;
		try {
			data = await (await fetch(url)).json();
		} catch {
			return;
		}
		if (data.images[0].title != bg.title) {
			console.log('freshing');
			bg = data.images[0];
			bg.url = `https://bw.recollect.top${bg.urlbase}_UHD.jpg`;
			const fr = new FileReader();
			fr.readAsDataURL(await (await fetch(bg.url)).blob());
			fr.onload = () => {
				bg.base64 = String(fr.result);
				localForage.setItem('bg', bg);
			};
		}
	}
	getBackgroundImage();
	setInterval(getBackgroundImage, 3600000);
</script>

<svelte:head>
	<title>CCD (Countdown, Clock, and Weather)</title>
</svelte:head>

<body style="background-image: url({bg.base64 || ''})">
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
	{#if bg.base64}
		<div id="bg-info" class="corner-left">
			<div><b>{bg.title}</b></div>
			<div>{bg.copyright.split(' (', 1)}</div>
			<div>{String(bg.copyright.split(' (', 2)[1]).split(')', 1)}</div>
		</div>
	{/if}
	<div id="bg-info" class="corner-right">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div>
			<b
				on:click={() => {
					window.location.reload();
				}}>CCD</b
			>
		</div>
		<div>Countdown, Clock, and Weather</div>
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
	* {
		margin: 0 !important;
		padding: 0 !important;
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
		padding-right: 1rem !important;
		transform: perspective(7.5rem) rotateY(5deg);
		transform-origin: right;
		perspective-origin: right;
	}
	.right {
		padding-left: 1rem !important;
		transform: perspective(7.5rem) rotateY(-5deg);
		transform-origin: left;
		perspective-origin: right;
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
			'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
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
		font-family: 'IBM Plex Sans JP', 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
		text-align: right;
	}
</style>
