import localForage from 'localforage';
import config from '../config/image.config';
export default async function freshImage() {
	console.log('fetching image data');
	let image = config.format;
	if (await localForage.getItem('image')) image = Object(await localForage.getItem('image'));
	(await fetch(`${config.endpoint}/api/json?mkt=${config.mkt}&format=js&idx=0&n=1`)).json().then(
		async (result) => {
			console.log('fetch image data successfully');
			if (String(await result.images[0].title) != String(image.title)) {
				console.log('fetching image');
				image = await result.images[0];
				image.url = `${config.endpoint}/api/jpg${
					new URL(`http://example.com${image.urlbase}`).search
				}_UHD.jpg`;
				const Reader = new FileReader();
				Reader.readAsDataURL(await (await fetch(image.url)).blob());
				return new Promise((resolve) => {
					Reader.onload = () => {
						image.base64 = String(Reader.result);
						console.log('fetch image successfully');
						localForage.setItem('image', image);
						resolve(image);
					};
				});
			} else {
				console.log('image already up to date');
			}
		},
		() => {
			console.log('fetch image data failed');
		}
	);
	return image;
}
