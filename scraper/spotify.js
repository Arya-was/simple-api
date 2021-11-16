const Spotify = require('spotifydl-core').default
const fs = require('fs')

//Use public key
const spotifydl = new Spotify({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
})

module.exports = { spotifydl }
