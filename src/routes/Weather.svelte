<script>
	import '@ibm/plex/css/ibm-plex.min.css';
	let weather = {
		results: [
			{
				location: {
					id: 'C23NB62W20TF',
					name: '西雅图',
					country: 'US',
					path: '西雅图,华盛顿州,美国',
					timezone: 'America/Los_Angeles',
					timezone_offset: '-07:00'
				},
				now: {
					text: 'Cloudy', //天气现象文字
					code: '4', //天气现象代码
					temperature: '14',
					unit: 'c' //温度，单位为c摄氏度或f华氏度
				},
				last_update: '2015-09-25T22:45:00-07:00' //数据更新时间（该城市的本地时间）
			}
		]
	};
	async function getWeather() {
		let url = new URL(window.location.href);
		let key = url.searchParams.get('key');
		let location = url.searchParams.get('location') || 'Foshan';
		let unit = url.searchParams.get('unit') || 'c';
		if (key && location) {
			let url = `https://api.seniverse.com/v3/weather/now.json?key=${key}&location=${location}&language=en&unit=${unit}`;
			try {
				let data = await (await fetch(url)).json();
				weather = data;
				weather.results[0].now.unit = unit;
			} catch {}
		}
	}
	getWeather();
	setInterval(getWeather, 600000);
</script>

<div class="weather">
	<div class="weather-temperature">
		{weather.results[0].now.temperature}°{weather.results[0].now.unit.toUpperCase()}
	</div>
	<div class="weather-text">{weather.results[0].now.text}</div>
</div>

<style>
	.weather {
		color: rgba(255, 255, 255, 0.5);
		text-align: center;
		font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.weather-temperature {
		font-size: 6rem;
		font-weight: 600;
	}
	.weather-text {
		position: relative;
		top: -2rem;
		font-size: 1.5rem;
		font-weight: 500;
	}
</style>
