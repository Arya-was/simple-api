const express = require('express')
var router = express.Router();
const { getBuffer } = require('../lib/function')
const axios = require('axios')
const fs = require('fs')
const akaneko = require('../scraper/akaneko')
__path = process.cwd()

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

router.get('/akaneko', async(req, res) => {
    var param = req.query.param
    if (!param) return res.json({ message: 'masukan parameter param' })
    const result = await akaneko.akanekoApi(param)
    data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/image.png', data)
    await res.sendFile(__path +'/tmp/image.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/image.png')
})
router.get('/waifu', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/waifu.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})
router.get('/husbu', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/husbu.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})
router.get('/loli', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})
router.get('/milf', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})
router.get('/cosplay', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

module.exports = router
