const express = require('express')
var router = express.Router();
const axios = require('axios')

const { artinama, ramalanJodoh } = require('../scraper/primbon')

router.get('/artinama', async(req, res) => {
	var nama = req.query.nama
	if (!nama) return res.json({ message: 'masukan parameter nama' })
	var hasil = await artinama(nama)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/ramalanjodoh', async(req, res) => {
	var nama = req.query.nama
  var pasangan = req.query.pasangan
	if (!nama) return res.json({ message: 'masukan parameter nama' })
  if (!pasangan) return res.json({ message: 'masukan parameter pasangan' })
	var hasil = await ramalanJodoh(nama, pasangan)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/togelresult', async(req, res) => {
	var q = req.query.q
	var togel = (await axios.get(`https://www.api.anubiskun.xyz/togel/?q=${q}&api=free1000limit`)).data
	if (!q) return res.json({ message: 'masukan parameter nama' })
	try {
		res.json(togel)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/togellist', async(req, res) => {
	var togel = (await axios.get(`https://www.api.anubiskun.xyz/togel/?api=free1000limit`)).data
	try {
		res.json(togel)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

module.exports = router
