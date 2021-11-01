const express = require('express'),
    secure = require('ssl-express-www')
const PORT = process.env.PORT || 8080;
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var app = express();
app.use(secure)
app.use(morgan('dev'));
app.use(express.static('client'));
app.set("json spaces",2)
__path = process.cwd()


var downloader = require('./server/downloader.js');
var search = require('./server/search.js');
var randomimg = require('./server/randomimage.js');
var nsfw = require('./server/nsfw.js');
var photooxy = require('./server/photooxy.js');
var otakudesu = require('./server/otakudesu.js');
var games = require('./server/games.js');
var main = require('./main');

app.use('/downloader', downloader)
app.use('/search', search)
app.use('/randomimg', randomimg)
app.use('/nsfw', nsfw)
app.use('/photooxy', photooxy)
app.use('/otakudesu', otakudesu)
app.use('/games', games)
app.use('/', main)

// Cretae folder
if (!fs.existsSync('./tmp/file')) fs.mkdirSync('./tmp/file')

    function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const storage = multer.diskStorage({
    destination: 'tmp/file',
    filename: (req, file, cb) => {
        cb(null, makeid(12) +
            path.extname(file.originalname))
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10000000 // 10 MB
    }
})

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file.path) return res.status(400).json({
        status: false,
        message: "No file uploaded"
    })
    res.status(200).json({
        status: true,
        result: {
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size,
            url: "https://" + req.hostname + "/file/" + req.file.filename
        }
    })
}, (error, req, res, next) => {
    res.status(400).json({
        error: error.message
    })
})

app.listen(PORT, () => {
    console.log(`Server Run on port ${PORT}`)
});
