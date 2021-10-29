const express = require('express')
var router = express.Router();

//scraper
const { pinterest, randomTiktok } = require('../scraper/index') 

router.get('/google', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var google = require('google-it')
	var result = google({'query': query}).then(result => {
	res.json({ result })
	})
})
router.get('/pinterest', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await pinterest(query)
	res.json({ result })
})
router.get('/tiktok', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await randomTiktok(query)
	res.json({ result })
})

module.exports = router
