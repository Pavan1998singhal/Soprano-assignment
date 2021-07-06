const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './assests');
    },
    filename: (req, file, cb) => {
        var fileType = '';
        console.log('mimeType: ', file.mimetype);
        if(file.mimetype === 'image/gif')
            fileType = 'gif';
        if (file.mimetype === 'image/png')
            fileType = 'png';
        if (file.mimetype === 'image/jpeg')
            fileType = 'jpg';
        if (file.mimetype === 'image/jpg')
            fileType = 'jpg';

        cb(null, 'image-' + Date.now() + '.' + fileType);
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 4 * 1024 * 1024 },   // 4 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
});

module.exports = upload;