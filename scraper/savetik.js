const axios = require('axios');
const cheerio = require('cheerio');

function savetik(URL) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: 'https://savetiknowm.org/',
			method: "POST",
			data: new URLSearchParams(Object.entries({ tiktok_url: URL })),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const result = { 
				creator: {
					username: $('#tiktok-video-result > div.result-wrapper > div.result > div:nth-child(2) > div > a.username').text(),
					usernickname: $('#tiktok-video-result > div.result-wrapper > div.result > div:nth-child(2) > div > a.user-nickname').text(),
					desc: $('#tiktok-video-result > div.result-wrapper > div.result > div:nth-child(2) > p').text(),
				},
				url: 'https://savetiknowm.org'+$('#tiktok-video-result > div.result-wrapper > div.download-buttons > a').attr('href')
			}
			console.log(result)
			resolve(result)
		}).catch(reject)
	})
}

module.exports = savetik
