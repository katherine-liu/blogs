const mongoose = require('mongoose');
// const uri = 'mongodb://127.0.0.1:27017/foodietalk'
const uri = 'mongodb://dearcatkin111:liuS122619@ds257589.mlab.com:57589/kath-blog';
const options = {};

mongoose.Promise = global.Promise;

mongoose.connect(uri, options)
.then(db => {
  console.log('connect to db successfully :)')
})
.catch(e => console.log(e));

module.exports = { mongoose }
