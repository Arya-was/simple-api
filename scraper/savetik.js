const axios = require('axios');
const cheerio = require('cheerio');

const pickrandom = async(ext) => {
  return ext[Math.floor(Math.random() * ext.length)]
}
const getRandom = () => {
	return `${Math.floor(Math.random() * 284)}`
}

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

function savetikGetVideosUrl() {
	return new Promise(async(resolve, reject) => {
		const randomPage = getRandom()
		const result = []
		axios.request({
			url: 'https://savetiknowm.org/videos',
			method: 'GET',
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
			}
		}).then(res => {
			const ch = cheerio.load(res.data)
			ch('body > div.videos-grid > div').each(function(a, b) {
				const thumb = ch(b).find('a > div').attr('data-bg')
				const creator = ch(b).find('a').attr('href')
				const url1 = thumb.replace('/static/nowatermark/previews/', '').replace('.jpg', '')
				const url = creator+'/'+url1
				result.push({ thumb, creator, url })
				resolve(result)
			})
		}).catch(reject)
	})
}

function savetikVideo() {
	return new Promise(async(resolve, reject) => {
		const Url = await savetikGetVideosUrl()
		const getUrl = await pickrandom(Url)
		const getURL = 'https://savetiknowm.org'+getUrl.url
		axios.request({
			url: getURL,
			method: 'GET',
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const result = {
				creator: {
					profile: 'https://savetiknowm.org'+$('#tiktok-video-result > div > div.result > div:nth-child(2) > div.profile > img').attr('src'),
					username: $('#tiktok-video-result > div > div.result > div:nth-child(2) > div.profile > a.username').text(),
					nickname: $('#tiktok-video-result > div > div.result > div:nth-child(2) > div.profile > a.user-nickname').text(),
				},
				url_dl: $('#tiktok-video-result > div > div.download-buttons > a').attr('href'),
				desc: $('#tiktok-video-result > div > div.result > div:nth-child(2) > p').text(),
				likes: $('#tiktok-video-result > div > div.result > div:nth-child(2) > ul > li > span').text()
			}
			resolve(result)
		})
	})
}

module.exports = { savetik, savetikVideo }
