<script>
	import FetchImage from './FetchImage';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="control">
	<div
		class="name"
		on:click={() => {
			FetchImage();
		}}
	>
		CCD
	</div>
	<div><span>Countdown</span>, <span>Clock</span>, and <span>Weather</span></div>
</div>

<style>
	.control {
		user-select: none;
	}
	.name {
		font-size: 2em;
		font-weight: 900;
	}
</style>
