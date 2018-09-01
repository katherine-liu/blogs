const { mongoose } = require('../config/database')
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {type: String},
  image: {
    path: {type: String},
    filename: {type: String}
  },
  author: {type: String},
  createOn: {type: String, default: Date.now()},
  modifiedOn: {type: String},
  content: {type: String}
},
{
  collection: 'blogs',
});

const Blog = mongoose.model('Blog', blogSchema)

const imgSchema = new Schema(
  {
    blog: {type: String, ref: 'Blog'},
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: String
  },
  {
    collection: 'images',
    versionKey: ''
  });

const Img = mongoose.model('Img', imgSchema);

module.exports = { Blog, Img }
