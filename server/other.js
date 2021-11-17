const express = require('express')
var router = express.Router();
const { getBuffer } = require('../lib/function')
const { merdekaNews } = require('../scraper/merdekanews')
const fs = require('fs')
__path = process.cwd()

router.get('/nulis', async(req, res) => {
  var text = req.query.text
  if (!text) return res.json({ 'message': 'masukan parameter text!'})
    const data = await getBuffer(`https://rya-kun.herokuapp.com/api/nulis?text=${text}`)
    await fs.writeFileSync(__path +'/tmp/nulis.png', data)
    await res.sendFile(__path +'/tmp/nulis.png')
})

router.get('/ttp', async(req, res) => {
  var text = req.query.text
  if (!text) return res.json({ 'message': 'masukan parameter text!'})
    const data = await getBuffer(`https://rya-kun.herokuapp.com/api/ttp?text=${text}`)
    await fs.writeFileSync(__path +'/tmp/ttp.png', data)
    await res.sendFile(__path +'/tmp/ttp.png')
})

router.get('/attp', async(req, res) => {
  var text = req.query.text
  if (!text) return res.json({ 'message': 'masukan parameter text!'})
    const data = await getBuffer(`https://rya-kun.herokuapp.com/api/attp?text=${text}`)
    await fs.writeFileSync(__path +'/tmp/attp.png', data)
    await res.sendFile(__path +'/tmp/attp.png')
})


router.get('/removebg', async(req, res) => {
  var link = req.query.link
  if (!link) return res.json({ 'message': 'masukan parameter link!'})
    const data = await getBuffer(`https://rya-kun.herokuapp.com/api/removebg?link=${link}`)
    await fs.writeFileSync(__path +'/tmp/removebg.png', data)
    await res.sendFile(__path +'/tmp/removebg.png')
})

router.get('/ssweb', async(req, res) => {
  var link = req.query.link
  if (!link) return res.json({ 'message': 'masukan parameter link!'})
    const data = await getBuffer(`https://rya-kun.herokuapp.com/api/ssweb?link=${link}`)
    await fs.writeFileSync(__path +'/tmp/ssweb.png', data)
    await res.sendFile(__path +'/tmp/ssweb.png')
})

router.get('/merdeka', async(req, res) => {
 const result = await merdekaNews()
 res.json({ result })
})

//Qrcode
router.get("/qrcode", (req, res) => {
 var qr = require('qr-image')
 var text = req.query.text
 if(!text) return res.json({ message: 'Masukan Kata!' })
 var img = qr.image(text,{size :13});
 res.writeHead(200, {'Content-Type': 'image/png'});
 img.pipe(res);
});

//Meme
router.get('/meme', async (req, res) => {
     const fetch = require('node-fetch')
     const subReddits = ["dankmeme", "meme", "memes"];
     const random = Math.floor(Math.random() * subReddits.length)
     var body = await fetch('https://www.reddit.com/r/' + subReddits[random] + '/random/.json')
     body = await body.json()
     const a = body[0]
     const title = a.data.children[0].data.title
     const url = 'https://reddit.com'+a.data.children[0].data.permalink
     const link = a.data.children[0].data.url_overridden_by_dest
     const ups = a.data.children[0].data.ups
     const comments = a.data.children[0].data.num_comments
     const sub = a.data.children[0].data.subreddit_name_prefixed
     const preview = a.data.children[0].data.preview
     return res.json({
         status: true,
         title: title, 
         url: url, 
         image: link, 
         ups: ups, 
         comments: comments 
    });
 })

module.exports = router
