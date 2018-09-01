const express = require('express')
const EventCtrl = require('../controllers/blog/userCtrl')
const UploadCtrl = require('../controllers/blog/uploadCtrl')
const router = express.Router()

router.route('/upload')
.post(UploadCtrl.uploadImage)

router.route('/blogs')
.get(EventCtrl.get)
.post(EventCtrl.save)

router.route('/blogs/:id')
.get(EventCtrl.getById)
.patch(EventCtrl.updateById)
.delete(EventCtrl.destroyById)

module.exports = router
