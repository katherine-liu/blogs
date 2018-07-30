const data = require('./blog.json')
const { Blog } = require('../../models/blog.js')

Blog.insertMany(data)
.then(() => console.log('Insert events successfully!'))
