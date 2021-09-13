const express = require('express'),
    secure = require('ssl-express-www')
const PORT = process.env.PORT || 8080;
const morgan = require('morgan')
var app = express();
app.use(secure)
app.use(morgan('dev'));
app.use(express.static('client'));
__path = process.cwd()

var downloader = require('./server/downloader.js');
var search = require('./server/search.js');
var randomimg = require('./server/randomimage.js');
var nsfw = require('./server/nsfw.js');
var main = require('./main');

app.use('/downloader', downloader)
app.use('/search', search)
app.use('/randomimg', randomimg)
app.use('/nsfw', nsfw)
app.use('/', main)


app.listen(PORT, () => {
    console.log(`Server Run on port ${PORT}`)
});
