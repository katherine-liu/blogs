const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/foodietalk'
const options = {};

mongoose.Promise = global.Promise;

mongoose.connect(uri, options)
.then(db => {
  console.log('connect to db successfully :)')
})
.catch(e => console.log(e));

module.exports = { mongoose }
