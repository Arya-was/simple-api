const axios = require('axios');
const cheerio = require('cheerio');

async function _tebakgambar() {
	return new Promise((resolve, reject) => {
		axios.get('https://jawabantebakgambar.net/all-answers/').then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			$('#images > li > a').each(function(a, b) {
				const img = 'https://jawabantebakgambar.net'+$(b).find('img').attr('data-src')
				const jawaban = $(b).find('img').attr('alt').replace('Jawaban ', '')
				result.push({ img, jawaban })
			})
			resolve(result)
		}).catch(reject)
	})
}
async function tebakgambar() {
	return new Promise(async(resolve, reject) => {
		let ctrl = await _tebakgambar()
		let ct = await  ctrl[Math.floor(Math.random() * ctrl.length)]
		resolve(ct)
	})
}


module.exports = tebakgambar
