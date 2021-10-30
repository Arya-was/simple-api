const axios = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://otakudesu.vip'

const headers = {
	"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
	"cookie": "_ga=GA1.2.94384000.1635596588; _gid=GA1.2.919815583.1635596588; _gat=1"
}

async function Search(query) {
	return new Promise((resolve, reject) => {
		axios.get(baseUrl+'/?s='+query+'&post_type=anime', {headers}).then(res =>{
			const $ = cheerio.load(res.data)
			const result = []
			const title = []
			const link = []
			const thumb = []
			$('#venkonten > div > div.venser > div > div > ul > li > h2 > a').each(function(a, b) {
				const _title = $(b).text()
				const _url = $(b).attr('href')
				title.push(_title)
				link.push(_url)
			})
			$('#venkonten > div > div.venser > div > div > ul > li > img').each(function(a, b) {
				const _thumb = $(b).attr('src')
				thumb.push(_thumb)
			})
			for (let i = 0; i < title.length; i++) {
				result.push({
					title: title[i],
					thumb: thumb[i],
					link: link[i]
				})
			}
			resolve(result)
		}).catch(reject)
	})
}
async function getInfo(URL) {
	return new Promise((resolve, reject) => {
		axios.get(URL, {headers}).then(res => {
			const info = {}
			const eps = []
			const $ = cheerio.load(res.data)
			const thumb = $('#venkonten > div.venser > div.fotoanime > img').attr('src')
			const title = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span').text().replace('Judul: ', '')
			const japanese_title = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span').text().replace('Japanese: ', '') 
			const score = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span').text().replace('Skor: ','')
			const producer = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span').text().replace('Produser: ','')
			const type = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span').text().replace('Tipe: ','')
			const status = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span').text().replace('Status: ','')
			const total_eps = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span').text().replace('Total Episode: ','')
			const duration = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span').text().replace('Durasi: ','')
			const release_date = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span').text().replace('Tanggal Rilis', '')
			const studio = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span').text().replace('Studio:', '')
			const genre = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span').text().replace('Genre: ','')       
			const sinopsis = $('#venkonten > div.venser > div.fotoanime > div.sinopc > p:nth-child(1)').text()
			$('#venkonten > div.venser > div:nth-child(8) > ul > li > span > a').each(function(a, b) {
				const _eps = $(b).attr('href')
				const _title = $(b).text()
				eps.push({ _eps, _title })
			})
			const result = {
				title: title,
				japanese_title: japanese_title,
				score: score,
				producer: producer,
				type: type,
				status: status,
				total_eps: total_eps,
				duration: duration,
				release_date: release_date,
				studio: studio,
				genre: genre,
				sinopsis: sinopsis,
				thumb: thumb,
				episode: eps
			}
			resolve(result)
		}).catch(reject)
	})
}
async function Getdownload(URL) {
	return new Promise((resolve, reject) => {
		axios.get(URL, {headers}).then(res => {
			const $ = cheerio.load(res.data)
			const low = $('#venkonten > div.venser > div.venutama > div.download > ul > li:nth-child(1) > a:nth-child(2)').attr('href')
			const medium = $('#venkonten > div.venser > div.venutama > div.download > ul > li:nth-child(2) > a:nth-child(2)').attr('href')
			const high = $('#venkonten > div.venser > div.venutama > div.download > ul > li:nth-child(3) > a:nth-child(2)').attr('href')
			const title = $('#venkonten > div.venser > div.venutama > h1').text()
			const thumb = $('#venkonten > div.venser > div.cukder > img').attr('src')
			const result = {
				title: title,
				thumb: thumb,
				high: high,
				medium: medium,
				low: low
			}
			resolve(result)
		}).catch(reject)
	})
}
module.exports = { Search, getInfo, Getdownload }
