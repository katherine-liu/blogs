const { mongoose } = require('../config/database')
const options = {}
const blogSchema = new mongoose.Schema({
  title: {type: String},
  image: {
    host: {type: String},
    path: {type: String},
    port: {type: String}
  },
  author: {type: String},
  createOn: {type: String},
  modifiedOn: {type: String},
  content: {type: String}
}, options)

const Blog = mongoose.model('Blog', blogSchema)

const imageSchema = new mongoose.Schema({
  filename: String,
  metadata: String,
  aliases: String
}, { collection: 'fs.files', versionKey: '' });

const Image = mongoose.model('Image', imageSchema);

module.exports = { Blog, Image }
