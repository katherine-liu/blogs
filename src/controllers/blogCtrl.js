const { Blog } = require('../models/blog')

const get = (req, res) => {
  Blog.find()
  .then(doc => res.send(doc))
  .catch(err => console.log(err))
}

const save = (req, res) => {
  console.log(req.body);
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    createOn: new Date(),
    modifiedOn: '',
    content: req.body.content
  })

  blog.save()
  .then(doc => res.send(doc))
  .catch(err => console.log(err))
}

const getById = (req, res) => {
  const id = req.params.id

  Blog.findById(id)
  .then(doc => res.send(doc))
  .catch(err => console.log(err))
}

const updateById = (req, res) => {
  const id = req.params.id
  const body = {
    title: req.body.title,
    image: {
      host: req.image.host,
      port: req.image.port,
      path: req.image.path
    },
    author: req.body.author,
    modifiedOn: new Date(),
    content: req.body.content
  }

  Blog.findByIdAndUpdate(id, { $set: body}, { new: true })
  .then(doc => res.send(doc))
  .catch(err => console.log(err))
}

const destroyById = (req, res) => {
  const id = req.params.id

  Blog.findByIdAndRemove(id)
  .then(doc => res.send(doc))
  .catch(err => console.log(err))
}

module.exports = { get, save, getById, updateById, destroyById }
