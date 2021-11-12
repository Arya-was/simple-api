const express = require('express')
var router = express.Router();
const { getBuffer } = require('../lib/function')
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

module.exports = router
