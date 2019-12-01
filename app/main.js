const getBtn = document.querySelector('#getBtn');
const sendBtn = document.querySelector('#sendBtn');
getBtn.addEventListener('click', getData);
sendBtn.addEventListener('click', sendData);

const jsonData = {
	"name": "John",
	"age": 30,
	"car": null
};

async function getData() {

	const data = await (await fetch('data.json')).json();
	console.log(data);

}

async function sendData() {

	const postResponse = await fetch('', {
		method: 'POST',
		body: JSON.stringify(jsonData),
		headers: {
			'Content-Type': 'application/json'
    }
	});

	console.log((await postResponse.json()).serverMessage);

}