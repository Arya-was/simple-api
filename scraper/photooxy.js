const axios = require('axios')
const cheerio = require('cheerio')

async function photoXy_1(URL, text_1) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: URL,
			method: "POST",
			data: new URLSearchParams(Object.entries({ text_1: text_1, login: "OK"})),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const img = 'https://photooxy.com'+$('#content-wrapper > section > div > div.col-md-9 > div.thumbnail > img').attr('src')
			resolve(img)
		}).catch(reject)
	})
}
async function photoXy_2(URL, text_1, text_2) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: URL,
			method: "POST",
			data: new URLSearchParams(Object.entries({ text_1: text_1, text_2: text_2, login: "OK"})),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const img = 'https://photooxy.com'+$('#content-wrapper > section > div > div.col-md-9 > div.thumbnail > img').attr('src')
			resolve(img)
		}).catch(reject)
	})
}

module.exports = { photoXy_1, photoXy_2 }
