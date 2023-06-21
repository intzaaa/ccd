export async function GET({ url }) {
	console.log(url);
	const jpg = (await fetch(`https://bing.com/th${url.search}`)).body;
	return new Response(jpg);
}
