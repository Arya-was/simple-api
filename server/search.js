const express = require('express')
var router = express.Router();
__path = process.cwd()
const fs = require('fs')
const { getBuffer } = require('../lib/function')

//scraper
const { pinterest, randomTiktok, konachan } = require('../scraper/index') 
const { wallpapercave, wallpaperscraft, wallpaperflare, alphacoders } = require('../scraper/wallpaper')
const { stickerSearch } = require('../scraper/stickerpack')
const { savetikVideo } = require('../scraper/savetik')
const { happymodSearch } = require('../scraper/happymod')
const { searchIlust } = require('../scraper/pixiv')
const { tiktokHastag } = require('../scraper/tiktok_search')


//Biar Result nya 20
//Disable Console Log
router.get('/google', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var google = require('google-it')
	var result = google({'query' : `${query}`, limit: 20, disableConsole: true }).then(result => {
	res.json({ result })
	})
})     

router.get('/pinterest', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await pinterest(query)
	res.json({ result })
})
router.get('/pixiv', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await searchIlust(query)
	res.json({ result })
})
router.get('/konachan', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await konachan(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/konachan.png', data)
   	await res.sendFile(__path +'/tmp/konachan.png')
})
router.get('/alphacoders', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await alphacoders(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/image.png', data)
   	await res.sendFile(__path +'/tmp/image.png')
})
router.get('/wallpapercave', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await wallpapercave(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/image.png', data)
   	await res.sendFile(__path +'/tmp/image.png')
})
router.get('/wallpaperscraft', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await wallpaperscraft(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/image.png', data)
   	await res.sendFile(__path +'/tmp/image.png')
})
router.get('/wallpaperflare', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await wallpaperflare(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/image.png', data)
   	await res.sendFile(__path +'/tmp/image.png')
})
router.get('/tiktok', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await tiktokHastag(query)
	res.json({ result })
})
router.get('/tiktokHastag', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await randomTiktok(query)
	res.json({ result })
})
router.get('/randomtiktok', async(req, res) => {
	var result = await savetikVideo()
	res.json({ result })
})
router.get('/happymod', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await happymodSearch(query)
	res.json({ result })
})
router.get('/sticker', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await stickerSearch(query)
	res.json({ result })
})

module.exports = router
