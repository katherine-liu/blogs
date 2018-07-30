const Blog = require('../models/blogs')

Blog.find()
.then(doc => console.log('\nFind All: \n', doc))
