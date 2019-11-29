const btn = document.querySelector('button');
btn.addEventListener('click', getServerMessage);

const jsonData = {
	"name": "John",
	"age": 30,
	"car": null
};

async function getServerMessage() {

	// get, very easy
	const data = await (await fetch('data/data.json')).json();
	console.log(data);

	// post, not so much
	const postResponse = await fetch('', {
		method: 'POST',
		body: jsonData
	});

	console.log(await postResponse.text());
}