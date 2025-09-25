const cloudinary = require('./cloudinaryConfig');
const stearmifier = require('streamifier');

const upload = (file) => {
    return new Promise((resolve, reject) => {
        let steam = cloudinary.uploader.upload_stream({folder: 'test',transformation:[{width:800, height:800, crop:'limit'}]},(error, result) => {
            if (error) { return reject(error); }
            resolve(result);
        })


        stearmifier.createReadStream(file.buffer).pipe(steam);
    })

}


module.exports = upload;