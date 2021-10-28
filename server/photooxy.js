__path = process.cwd()
const express = require('express')
var router = express.Router();
const fs = require('fs')
const fetch = require('node-fetch')

const { photoXy_1, photoXy_2 } = require('../scraper/photooxy')

router.get('/photooxy1', async (req, res) => {
	var text = req.query.text
  	var link = req.query.link
	if (!text) return res.json({ message: 'masukan parameter Text' })
  	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await photoXy_1(link, text)
	try {
	var Buffer = fetch(hasil, {
		headers: {
		"User-Agent": "Opera/9.80 (X11; Linux i686; U; ru) Presto/2.8.131 Version/11.11"
		}
	}
	var getBuffer = await Buffer.buffer()
	await fs.writeFileSync(__path + '/tmp/image.jpg', getBuffer)
	res.sendFile(__path + '/tmp/image.jpg')
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/photooxy2', async (req, res) => {
	var text = req.query.text
  	var text_2 = req.query.text_2
  	var link = req.query.link
	if (!text) return res.json({ message: 'masukan parameter Text' })
  	if (!text_2) return res.json({ message: 'masukan parameter Text' })
  	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await photoXy_2(link, text, text_2)
	try {
	var Buffer = fetch(hasil, {
		headers: {
		"User-Agent": "Opera/9.80 (X11; Linux i686; U; ru) Presto/2.8.131 Version/11.11"
		}
	}
	var getBuffer = await Buffer.buffer()
	await fs.writeFileSync(__path + '/tmp/image.jpg', getBuffer)
	res.sendFile(__path + '/tmp/image.jpg')
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

module.exports = router
