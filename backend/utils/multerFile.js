const multer = require('multer');

const upload = multer({Storage : multer.memoryStorage()}).single('image');

module.exports = upload;