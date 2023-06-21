<script>
	import '@ibm/plex/css/ibm-plex.min.css';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	dayjs.extend(customParseFormat);
	function Get() {
		let d = new Date();
		let z = Date.now();
		this.time = dayjs(`${d.getHours()} ${d.getMinutes()} ${d.getSeconds()}`, 'HH m s').format(
			'HH:mm:ss'
		);
		this.date = dayjs(
			`${d.getFullYear()}-${Number(d.getMonth()) + 1}-${d.getDate()}`,
			'YYYY-M-D'
		).format('YYYY-MM-DD');
		this.z = z;
	}
	let clock = new Get();
	setInterval(() => {
		clock = new Get();
	}, 49);
</script>

<div style="" class="clock">
	<div class="clock-time">{clock.time}</div>
	<div class="clock-date">{clock.date}</div>
</div>

<style>
	.clock {
		color: rgba(255, 255, 255, 0.5);
		text-align: center;
		font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.clock-time {
		font-size: 6em;
		font-weight: 600;
	}
	.clock-date {
		position: relative;
		top: -2rem;
		font-size: 1.5em;
		font-weight: 500;
	}
</style>
