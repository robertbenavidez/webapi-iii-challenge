const express = require('express');

const server = express();

const moment = require('moment')


const userRouter = require('./users/userRouter.js')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use(express.json());
server.use(logger);
//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const timestamp = moment().format("MMMM Do YYYY, h:mm:ss a"); 

  console.log(`you made a ${method} request to ${url} at ${timestamp}`);
  next();
};

server.use('/api/users', userRouter)

module.exports = server;
