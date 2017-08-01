// node app entry point

const express = require('express');

const app = express();

const parseHeader = function parseRequestHeader(headers) {
  return {
    ipaddress: headers['x-forwarded-for'].split(',')[0],
    language: headers['accept-language'].split(',')[0],
    software: headers['user-agent'].split(/([\(\)])/)[2]
  };
}


app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/whoami", (req, res) => {
  res.json(parseHeader(req.headers));
});

// listen for requests
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
