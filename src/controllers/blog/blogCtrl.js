const { Blog } = require('../../models/blog');

const get = (req, res) => {
  Blog.find()
  .then(docs => {
    const response = {
      count: docs.length,
      blogs: docs.map(doc => {
        const imageFile = doc.image;
        let imageUrl = null;
        if (imageFile.filename !== undefined) {
          imageUrl = 'http://localhost:3000/images/' + imageFile.filename
          console.log(imageUrl);
        }
        return {
          title: doc.title,
          author: doc.author,
          content: doc.content,
          image: doc.image,
          createOn: doc.createOn,
          _id: doc._id,
          request: {
            type: 'GET',
            url: imageUrl
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
    image: req.file
  });

  blog.save()
  .then(doc => {
    const imageFile = doc.image;
    let imageUrl = null;
    if (imageFile.filename !== undefined) {
      imageUrl = 'http://localhost:3000/images/' + imageFile.filename
    }
    res.status(201).json({
      message: 'Created blog successfully',
      createdBlog: {
        title: doc.title,
        author: doc.author,
        content: doc.content,
        image: doc.image,
        _id: doc._id,
        request: {
          type: 'GET',
          url: imageUrl
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
    const imageFile = doc.image;
    let imageUrl = null;
    if (imageFile.filename !== undefined) {
      imageUrl = 'http://localhost:3000/images/' + doc.image.filename
    }
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
          url: imageUrl
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
  };

  if (req.file) {
    body.image = req.file;
  }

  Blog.findByIdAndUpdate(id, { $set: body }, { new: true })
  .then(doc => {
    const imageFile = doc.image;
    let imageUrl = null;
    if (imageFile.filename !== undefined) {
      imageUrl = 'http://localhost:3000/images/' + imageFile.filename
    }
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
    })
  })
  .catch(err => console.log(err));
}

const destroyById = (req, res) => {
  const id = req.params.id

  Blog.findByIdAndRemove(id)
  .then(doc => {
    const imageFile = doc.image;
    let imageUrl = null;
    if (imageFile.filename !== undefined) {
      imageUrl = 'http://localhost:3000/images/' + imageFile.filename
    }
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
          url: imageUrl
        }
      }
    })
  })
  .catch(err => console.log(err))
}

module.exports = { get, save, getById, updateById, destroyById }
