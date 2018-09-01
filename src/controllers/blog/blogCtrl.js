const { Blog } = require('../../models/blog')

const get = (req, res) => {
  Blog.find()
  .then(docs => {
    const response = {
      count: docs.length,
      blogs: docs.map(doc => {
        return {
          title: doc.title,
          author: doc.author,
          content: doc.content,
          image: doc.image,
          createOn: doc.createOn,
          _id: doc._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/images/' + doc.image.filename
          }
        };
      })
    };
    res.send(response);
  })
  .catch(err => console.log(err))
}

const save = (req, res) => {
  const item = req.body;
  const blog = new Blog({
    title: item.title,
    author: item.author,
    content: item.content,
    image: {
      path: req.file.path,
      filename: req.file.filename
    }
  });

  blog.save()
  .then(result => {
    res.status(201).json({
      message: 'Created blog successfully',
      createdBlog: {
        title: result.title,
        author: result.author,
        content: result.content,
        image: result.image,
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/images/' + req.file.filename
        }
      }
    });
  })
  .catch(err => console.log(err));
}

const getById = (req, res) => {
  const id = req.params.id

  Blog.findById(id)
  .then(doc => {
    res.send({
      blog: {
        title: doc.title,
        author: doc.author,
        content: doc.content,
        image: doc.image,
        createOn: doc.createOn,
        _id: doc._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/images/' + doc.image.filename
        }
      }
    });
  })
  .catch(err => console.log(err))
}

const updateById = (req, res) => {
  const id = req.params.id
  const item = req.body;

  const body = {
    title: item.title,
    author: item.author,
    content: item.content,
    image: {
      path: req.file.path,
      filename: req.file.filename
    }
  };

  Blog.findByIdAndUpdate(id, { $set: body }, { new: true })
  .then(doc => res.send({
    blog: {
      title: doc.title,
      author: doc.author,
      content: doc.content,
      image: doc.image,
      createOn: doc.createOn,
      _id: doc._id,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/images/' + doc.image.filename
      }
    }
  }))
  .catch(err => console.log(err));
}

const destroyById = (req, res) => {
  const id = req.params.id

  Blog.findByIdAndRemove(id)
  .then(doc => res.send({
    blog: {
      title: doc.title,
      author: doc.author,
      content: doc.content,
      image: doc.image,
      createOn: doc.createOn,
      _id: doc._id,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/images/' + doc.image.filename
      }
    }
  }))
  .catch(err => console.log(err))
}

module.exports = { get, save, getById, updateById, destroyById }
