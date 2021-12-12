const cheerio = require('cheerio')
const url = require('url')
const axios = require('axios')

function zippy(Url) {
	return new Promise((resolve, reject) => { 
		try {
			axios.get(Url).then(res => {
				let result = {}
				const $ = cheerio.load(res.data)
				result.title = $('#lrbox > div:nth-child(1) > div:nth-child(1) > font:nth-child(4)').text()
				result.size = $('#lrbox > div:nth-child(1) > div:nth-child(1) > font:nth-child(7)').text()
				result.upload_date = $('#lrbox > div:nth-child(1) > div:nth-child(1) > font:nth-child(10)').text()
				$('script').each((i, e) => {
					let sc = $(e).html().search(/dlbutton/g)
					if (sc >= 0) {
						let divider = $(e).html().split(';')[0]
						let decrypt = divider.split("document.getElementById('dlbutton').href =")[1]
						console.log(decrypt)
						let _url
						if (decrypt) {
							_url = url.parse(Url).hostname + eval(decrypt)
							_url = _url.startsWith('http') ? _url : 'http://' + _url
							result.url = _url
						}
					}
				})
				resolve(result)
			})
		} catch(e) {
			console.log(e)
		}
	})
}
module.exports = { zippy }
