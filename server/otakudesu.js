const express = require('express')
var router = express.Router();

const otaku = require('../scraper/otakudesu')

router.get('/search', async(req, res) => {
	var anime = req.query.anime
	if (!anime) return res.json({ message: 'masukan parameter Anime' })
	var hasil = await otaku.Search(anime)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/animeDetail', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await otaku.getInfo(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/dl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await otaku.Getdownload(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

module.exports = router
