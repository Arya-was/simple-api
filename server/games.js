const express = require('express')
var router = express.Router();

const { tebakgambar } = require('../scraper/index') 

router.get('/tebakgambar', async(req, res) => {
	var hasil = await tebakgambar()
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

module.exports = router
