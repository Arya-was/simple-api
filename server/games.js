const express = require('express')
var router = express.Router();
const axios = require('axios')

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

router.get('/tebakgambar2', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/tebakgambar2/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/dareid', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/dareid/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/truthid', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/truthid/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/siapaaku', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/siapaaku/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/asahotak', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/asahotak/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/caklontong', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/caklontong/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/rangkaikataid', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/rangkaikata/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/rangkaikataen', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/rangkaikataen/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/tebakkata', async(req, res) => {
	var hasil = (await axios.get(`https://www.api.anubiskun.xyz/random/tebakkata/?api=free1000limit`)).data
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

module.exports = router
