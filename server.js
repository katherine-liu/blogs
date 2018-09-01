const express = require('express');
const bodyParser = require('body-parser');
const eventRouter = require('./src/routes/blogRouter');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/images', express.static('public/images'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
})

// @route GET /
// @desc Loads
app.get('/', (req, res) => {
  res.send('This is the foodie backend server, Listening on port: 3000!')
});

app.use('/api', eventRouter)

app.listen(port, () => console.log(`listen on: ${port}`))

module.exports = { app }
