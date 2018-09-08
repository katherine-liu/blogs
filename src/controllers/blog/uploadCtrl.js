const multer = require('multer');
const fs = require('fs');
const path = require('path');
const imagePath = path.resolve(__dirname, '../../../public/images');
const { Blog, Img } = require('../../models/blog');

const imageFilter = (req, file, cb) => {
  const depreciated = file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|mp4)$/);
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true)
  } else {
    cb(new Error('Wrong image type'), false);
  }
};

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadImage = (req, res, next) => {
  const upload = multer({
    storage: imageStorage,
    fileSize: { fileSize: 30000000},
    fileFilter: imageFilter
  }).single('image');
  upload(req, res, (err) => {
    if(err) {
      res.status(415).json({ msg: 'Error: Upload Image Only!', error: err });
    } else {
      if (req.file === undefined) {
        next();
        // res.status(415).json({ msg: 'Error: No File Selected!', error: err });
      } else {
        // res.send({ msg: 'File Uploaded!', file: `uploads/$(req.file.filename)`});
        next();
      }
    }
  });
};

const getImageById = (req, res) => {
  const id = req.params.id;
  Img.findById(id)
  .then(doc => res.send(doc))
  .catch(err => console.log(err));
};

const updateById = (req, res) => {
  const id = req.params.id
  const body = req.body;

  Img.findByIdAndUpdate(id, { $set: body }, { new: true })
  .then(doc => res.send(doc))
  .catch(err => console.log(err))
}

const downloadImage = (req, res) => {
  Img.find()
  .then(doc => { res.send(doc) })
  .catch(err => console.log(err));
};

module.exports = { uploadImage, getImageById, updateById, downloadImage }
