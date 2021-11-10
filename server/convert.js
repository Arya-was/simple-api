__path = process.cwd()
const express = require("express");
const fs = require('fs');
const fetch = require('node-fetch')
const router = express.Router()
const { ffmpeg, toAudio } = require('../lib/converter')

/**
 * Image to Webp
 * @param {String} url Image/Video URL
 */
 async function sticker(url) {
    if (url) {
      let res = await fetch(url)
      if (res.status !== 200) throw await res.text()
      img = await res.buffer()
    }
    return await ffmpeg(img, [
      '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
    ], 'jpeg', 'webp')
  }

router.get('/towebp', async(req, res) => {
    var url = req.query.url
    var packname = req.query.packname
    var creator = req.query.creator
    var stc = await sticker(url)
    await fs.writeFileSync(__path + '/tmp/stc.webp', stc)
	await res.sendFile(__path + '/tmp/stc.webp')
})
router.get('/tomp3', async(req, res) => {
    var url = req.query.url 
    const Buffer = await fetch(url)
	  const getBuffer = await Buffer.buffer()
    let audio = await toAudio(getBuffer, 'mp4')
    await fs.writeFileSync(__path + '/tmp/audio.mp3', audio)
	await res.sendFile(__path + '/tmp/audio.mp3')
})

module.exports = router
