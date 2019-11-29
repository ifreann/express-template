console.clear();
const express = require('express');
const app = express();
const bs = require("browser-sync").create();
const port = 3000;

// register client directory as root
app.use(express.static('app'));

// needed for parsing application/json, whatever that means. Can't see req.body's without these ¯\_(ツ)_/¯
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
	port: port + 1
}
bs.init(bsConfig);

app.get('/', (req, res) => {
	console.log("Got a GET request");
	// res.sendFile(__dirname + '\\index.html');
});

app.post('/', function (req, res) {
	console.log("Got a POST");
	console.log(req.body);
	res.json('REEEEEEE');
});

module.exports = app;