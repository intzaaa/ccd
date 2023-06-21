<script>
	import '@ibm/plex/css/ibm-plex.min.css';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	dayjs.extend(duration);
	let setTarget = {
		Y: new Date().getFullYear() + 1,
		M: 5,
		D: 7,
		h: 0,
		m: 0,
		s: 0
	};
	let url = new URL(window.location.href);
	if (url.searchParams.get('year')) setTarget.Y = Number(url.searchParams.get('year'));
	if (url.searchParams.get('month')) setTarget.M = Number(url.searchParams.get('month')) - 1;
	if (url.searchParams.get('day')) setTarget.D = Number(url.searchParams.get('day'));
	if (url.searchParams.get('hour')) setTarget.h = Number(url.searchParams.get('hour'));
	if (url.searchParams.get('minute')) setTarget.m = Number(url.searchParams.get('minute'));
	if (url.searchParams.get('second')) setTarget.s = Number(url.searchParams.get('second'));
	let target = new Date(
		setTarget.Y,
		setTarget.M,
		setTarget.D,
		setTarget.h,
		setTarget.m,
		setTarget.s
	).getTime();
	function Get() {
		let now = Date.now();
		this.differenceDays = Math.ceil(dayjs.duration(target - now).asDays());
		this.differenceWeeks = Number(String(this.differenceDays / 7).split('.', 1));
		this.differenceWeekDays = this.differenceDays % 7;
		if (this.differenceDays < 0) {
			this.differenceDays = this.differenceWeeks = this.differenceWeekDays = 0;
		}
	}
	let countdown = new Get();
	setInterval(() => {
		countdown = new Get();
	}, 99);
</script>

<div class="countdown">
	<div class="countdown-day">{countdown.differenceDays}D</div>
	<div class="countdown-week">{countdown.differenceWeeks}W+{countdown.differenceWeekDays}D</div>
</div>

<style>
	.countdown {
		color: rgba(255, 255, 255, 0.5);
		text-align: center;
		font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.countdown-day {
		font-size: 6rem;
		font-weight: 600;
	}
	.countdown-week {
		position: relative;
		top: -2rem;
		font-size: 1.5rem;
		font-weight: 500;
	}
</style>
