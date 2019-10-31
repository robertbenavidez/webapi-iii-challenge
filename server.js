const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const timestamp = moment().format("MMMM Do YYYY, h:mm:ss a"); 

  console.log(`you made a ${method} request to ${url} at ${timestamp}`);
  next();
};

module.exports = server;
