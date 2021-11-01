const axios = require('axios')
const cheerio = require('cheerio')

function sfiledl(URL) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: URL,
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const token = $('#content > div > div.middle > div.right > article:nth-child(1) > section:nth-child(3) > div.buttons > form > input[type=hidden]:nth-child(1)').attr('value')
			const title = $('#content > div > div.middle > div.right > article:nth-child(1) > section.box-content.meta > h1').text().trim()
			const _size = $('#content > div > div.middle > div.right > article:nth-child(1) > section.box-content.meta > p').text().trim()
			const size_ = _size.split('-')
			const size = size_[0]
		axios({
			url: URL+'/dl',
			method: "POST",
			data: new URLSearchParams(Object.entries({csrfmiddlewaretoken: token, referrer: URL})),
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
			}
		}).then(respon => {
			const ch = cheerio.load(respon.data)
			const url = ch('#content > div > div.middle > div.right > article:nth-child(1) > section > p > a').attr('href')
			const result = {
				title: title,
				size: size,
				url: url
			}
			resolve(result)
		})
		})
	})
}
module.exports = sfiledl