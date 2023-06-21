export async function GET({ url }) {
	console.log(url);
	const data = await (await fetch(`https://bing.com/HPImageArchive.aspx${url.search}`)).text();
	console.log(data);
	const response = new Response(data);
	response.headers.set('Content-Type', 'application/json; charset=utf-8');
	return response;
}
