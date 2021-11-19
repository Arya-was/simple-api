const express = require('express')
var router = express.Router();
const hxz = require('hxz-api')
const yts = require('yt-search')
__path = process.cwd()
const fs = require('fs')
const { getBuffer } = require('../lib/function')

//scraper
const { igDownload, tiktok, mediafireDl, pinterestdl, scdl, sfiledl, savetik } = require('../scraper/index') 
const { musicaldown } = require('../scraper/musicaldown')
const { stickerDl } = require('../scraper/stickerpack')
const { dl } = require('../scraper/aiovideodl')
const { spotifydl } = require('../scraper/spotify')
const { jooxdl, joox } = require('../scraper/joox')
const { pixivDownload } = require('../scraper/pixiv')

router.get('/tiktok', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await tiktok(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/tiktoknowm', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await musicaldown(link)
	try {
		var data = await getBuffer(hasil.nowm)
		await fs.writeFileSync(__path +'/tmp/tiktok.mp4', data)
   		await res.sendFile(__path +'/tmp/tiktok.mp4')
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/tiktokaudio', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await musicaldown(link)
	try {
		var data = await getBuffer(hasil.audio)
		await fs.writeFileSync(__path +'/tmp/tiktok.mp4', data)
   		await res.sendFile(__path +'/tmp/tiktok.mp4')
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/igdl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await igDownload(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/mediafireDl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await mediafireDl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/sfiledl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await sfiledl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/youtube', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await dl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/play', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	let results = await yts(query)
  	let vid = results.all.find(video => video.seconds < 3600)
	if (!vid) return res.json({ message: 'not found!'})
	var hasil = await dl(vid.url)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/pixiv', async(req, res) => {
	var id = req.query.id
	var ext = req.query.ext
	if (!id) return res.json({ message: 'masukan parameter id' })
	if (!ext) return res.json({ message: 'masukan parameter ext' })
	var hasil = await pixivDownload(id, ext)
	try {
		var data = await getBuffer(hasil)
		await fs.writeFileSync(__path +'/tmp/image.jpg', data)
   		await res.sendFile(__path +'/tmp/image.jpg')
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/fbdl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await dl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/likeedl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await dl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/twitter', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await hxz.twitter(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/pindl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await pinterestdl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/scdl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await scdl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/spotifydl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await spotifydl.downloadTrack(link)
	try {
		await fs.writeFileSync(__path +'/tmp/audio.mp3', hasil)
   		await res.sendFile(__path +'/tmp/audio.mp3')
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/spotify', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await spotifydl.getTrack(link)
	try {
		res.json({ info: hasil, dl_lnk: `https://tyz-api.herokuapp.com/downloader/spotifydl?link=${link}` })
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/stickerpack', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await stickerDl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

module.exports = router
