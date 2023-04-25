const express = require('express');
const shell = require('shelljs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.text());
app.get('/', (_req, res) => {
	res.send('this is ntuaf admin server');
});

app.get('/exec', (_req, res) => {
	if (shell.exec('bash ./script.sh').code !== 0) {
		res.send('Error : ' + shell.error());
		return;
	}
	res.send('OK!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
