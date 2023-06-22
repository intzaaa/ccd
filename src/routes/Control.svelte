<script>
	import './Control.scss';
	import FetchImage from './FetchImage';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="control">
	<div>
		<div
			class="name"
			on:click={() => {
				FetchImage();
			}}
		>
			CCD
		</div>
	</div>
	<div>
		<span>Countdown,</span> <span>Clock,</span> <span>and Weather</span>
	</div>
	<div
		on:click={() => {
			window.open('https://github.com/huangyinhaow/ccd');
		}}
		class="link"
	>
		huangyinhaow/ccd
	</div>
</div>
