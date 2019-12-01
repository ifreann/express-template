console.clear();
const express = require('express');
const app = express();
const bs = require("browser-sync").create();
const port = process.env.PORT || 3000;

// needed for parsing application/json. req's won't have a body without it ¯\_(ツ)_/¯
app.use(express.json());

// handle GET requests. app.get doesn't work as you'd expect with the `app.use(express.static...)` below, so it's done this way instead
app.use(function (req, res, next) {
	if (req.url.endsWith('.json')) {
		console.log(Object.keys(req));
		console.log(`${req.baseUrl} was requested.`);
	}
	next();
});

// register app directory as root
app.use(express.static('app'));
// register data directory for GET requests
app.use(express.static('data'));

// handle POST requests
app.post('', (req, res) => {
	const jsonData = req.body;
	console.log(jsonData);
	jsonData.serverMessage = 'hello from server :^)';
	res.send(jsonData);
	res.end();
});

// start server
app.listen(port);

// listen for changes in client directory on a proxied port (i.e. app is served on 3000, browsersync live-reloads 3001)
const bsConfig = {
	notify: false,
	ghostMode: false,
	browser: "Chrome",
	index: 'app/index.html',
	files: 'app/*',
	proxy: "localhost:" + port,
	port: port + 1,
	open: false
}
bs.init(bsConfig);