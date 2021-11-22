const express = require('express')
const secure = require('ssl-express-www')
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
var anime = require('./server/anime.js');
var randomimg = require('./server/randomimage.js');
var nsfw = require('./server/nsfw.js');
var photooxy = require('./server/photooxy.js');
var otakudesu = require('./server/otakudesu.js');
var games = require('./server/games.js');
var primbon = require('./server/primbon.js');
var convert = require('./server/convert.js');
var other = require('./server/other.js');
var main = require('./main');

app.use('/downloader', downloader)
app.use('/search', search)
app.use('/anime', anime)
app.use('/randomimg', randomimg)
app.use('/nsfw', nsfw)
app.use('/photooxy', photooxy)
app.use('/otakudesu', otakudesu)
app.use('/games', games)
app.use('/primbon', primbon)
app.use('/converter', convert)
app.use('/other', other)
app.use('/', main)

app.listen(PORT, () => {
    console.log(`Server Run on port ${PORT}`)
});
