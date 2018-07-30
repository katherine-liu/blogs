const multer = require('multer')
const path = require('path')

const imagePath = path.resolve(__dirname, '../../uploads/');

const imageFilter = (req, file, cb) => {
  const depreciated = file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|mp4)$/);
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true)
  } else {
    return cb(new Error('Wrong image type'), false);
  }

}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const uploadImage = (req, res) => {
  const upload = multer({
    storage: storage,
    fileSize: { fileSize: 30000000},
    fileFilter: imageFilter
  }).single('image');
  upload(req, res, (err) => {
    if(err) {
      res.status(415).json({ msg: 'Error: Upload Image Only!', error: err });
    } else {
      if (req.file === undefined) {
        res.status(415).json({ msg: 'Error: No File Selected!', error: err });
      } else {
        res.send({ msg: 'File Uploaded!', file: `uploads/$(req.file.filename)`});
      }
    }
  })
}


module.exports = { uploadImage }
