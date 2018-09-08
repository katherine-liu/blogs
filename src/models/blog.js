const { mongoose } = require('../config/database')
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {type: String},
  image: {
    fieldname: {type: String},
    originalname: {type: String},
    encoding: {type: String},
    mimetype: {type: String},
    destination: {type: String},
    filename: {type: String},
    path: {type: String},
    size: {type: Number}
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
