const Blog = require('../models/blog')

Blog.remove({})
.then(doc => console.log('\nRemoved: \n', doc))
