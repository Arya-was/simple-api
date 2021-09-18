const express = require('express')
var router = express.Router();

var nhentai = require('nhentai-js');
const NanaAPI = require('nana-api')
const nana = new NanaAPI()

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
        var result = hasil.results
		    res.json({ result })
})

module.exports = router
