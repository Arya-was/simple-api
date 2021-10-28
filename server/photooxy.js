__path = process.cwd()
const express = require('express')
var router = express.Router();

const { photoXy_1, photoXy_2 } = require('../scraper/photooxy')

router.get('/photooxy1', async (req, res) => {
	var text = req.query.text
  	var link = req.query.link
	if (!text) return res.json({ message: 'masukan parameter Text' })
  	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await photoXy_1(link, text)
	try {
	res.json(hasil)
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
	res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

module.exports = router
