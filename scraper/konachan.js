const axios = require('axios');
const cheerio = require('cheerio');

function konachan(q) {
	return new Promise((resolve, reject) => {
		let query = q.replace(/ /g, '_')
		axios.get('https://konachan.net/post?tags='+query+'+').then(res => {
			const $ = cheerio.load(res.data)
			const aray = []
			$('div.pagination > a').each(function(a, b) {
				const u = $(b).text()
				aray.push(u)
				let math = Math.floor(Math.random() * aray.length)
				axios.get('https://konachan.net/post?page='+math+'&tags='+query+'+').then(respon => {
					const ch = cheerio.load(respon.data)
					const result = []
					ch('#post-list > div.content > div:nth-child(4) > ul > li > a.directlink.largeimg').each(function(c, d) {
						const r = $(d).attr('href')
						result.push(r)
					})
					resolve(result)
				}).catch(reject)
			})
		}).catch(reject)
	})
}
module.exports = konachan 
