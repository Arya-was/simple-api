const express = require('express')
var router = express.Router();
__path = process.cwd()
var nhentai = require('nhentai-js');
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const axios = require('axios')
const { toPDF } = require(__path + '/lib/img2pdf')
const fs = require('fs')

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const { doujindesu } = require('../scraper/index') 

router.get('/nHentai', async (req, res) => {
        var code = req.query.code
        var result = await nhentai.getDoujin(`${code}`)
		    res.json({ result })
})
router.get('/nHentaiSearch', async (req, res) => {
        var query = req.query.query
        var hasil = await nana.search(`${query}`)
        var result = hasil.results
		    res.json({ result })
})
router.get('/doujindesuSearch', async (req, res) => {
        var query = req.query.query
        var hasil = await doujindesu(`${query}`)
	res.json(hasil)
})
router.get('/nhentaipdf', async (req, res) => {
	var code = req.query.code
	var nhres = `https://tyz-api.herokuapp.com/nsfw/nhcode?query=${code}`
	var nhread = `https://tyz-api.herokuapp.com/nsfw/nhread?query=${code}`
	res.json({
		pdf: nhres,
		read: nhread,
		note: 'dosa di tanggung sendiri!'
	})
})
router.get('/nhcode', async (req, res) => {
        try {
	var query = req.query.query
	let data = await axios.get('https://tyz-api.herokuapp.com/nsfw/nHentai?code='+query)
    	let restjson = data.data.result.pages
	let title = data.data.result.title
    	let duckJson = await restjson.map(a => 'https://external-content.duckduckgo.com/iu/?u=' + a)
   	let jsonTopdf = await toPDF(duckJson)
    	await fs.writeFileSync(__path + `/tmp/${title}.pdf`, jsonTopdf)
    	await res.sendFile(__path + `/tmp/${title}.pdf`)
    	await sleep(3000)
    	await fs.unlinkSync(__path + `/tmp/${title}.pdf`)
     } catch(err) {
       res.json({ error: err.message }) 
     }
})
router.get('/nhread', async(req, res) => {
	var query = req.query.query
	let data = await axios.get('https://tyz-api.herokuapp.com/nsfw/nHentai?code='+query)
	let restjson = data.data.result.pages
	let title = data.data.result.title
	let duckJson = await restjson.map(a => 'https://external-content.duckduckgo.com/iu/?u=' + a)
	let html = `<!DOCTYPE html>
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
	<style>
	img {
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
	}

	body {
		background-color: #1a202c;
		background-color: rgba(26, 32, 44, 1);
	}

	@media (min-width: 576px) {
		img {
			width: auto;
			max-width: 100%;
			height: auto;
		}
	}
	</style>
	</head>

	<body>`
	for(let url of duckJson) html += `<img src=${url}>`
		res.send(html)
})
module.exports = router
