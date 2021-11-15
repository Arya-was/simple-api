const axios = require('axios');
const cheerio = require('cheerio');

function igDownload(url) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: 'https://downloadgram.org/#downloadhere',
			method: 'POST',
			data: new URLSearchParams(Object.entries({url: url, submit: ''})),
			headers: {
				'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			$('#downloadBox > a').each(function(a, b) {
				result.push($(b).attr('href'))
			})
			resolve(result)
		}).catch(reject)
	})
}
module.exports = igDownload
