const express = require('express')
const EventCtrl = require('../controllers/blog/blogCtrl')
const UploadCtrl = require('../controllers/blog/uploadCtrl')
const router = express.Router()

router.route('/images')
.get(UploadCtrl.downloadImage)
.post(UploadCtrl.uploadImage)

router.route('/images/:id')
.get(UploadCtrl.getImageById)
.put(UploadCtrl.updateById)

router.route('/blogs')
.get(EventCtrl.get)
.post(UploadCtrl.uploadImage, EventCtrl.save)

router.route('/blogs/:id')
.get(EventCtrl.getById)
.put(UploadCtrl.uploadImage, EventCtrl.updateById)
.delete(EventCtrl.destroyById)

module.exports = router
