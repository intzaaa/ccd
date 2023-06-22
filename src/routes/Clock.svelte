<script>
	import './Clock.scss';
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
</style>
