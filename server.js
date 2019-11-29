const express = require('express');
const path = require('path');
const cors = require("cors");
const port = process.env.PORT || 4000;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));
app.use(cors());

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port);