const axios = require('axios')
const cheerio = require('cheerio')

const pickrandom = async(ext) => {
  return ext[Math.floor(Math.random() * ext.length)]
}

function ttSearch (query) {
	return new Promise((resolve, reject) => {
		axios.get('https://brainans.com/search?query='+query).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#search-container > div')
			main.each( function() {
				const user_url = 'https://brainans.com'+$(this).find('div.content__text > a').attr('href')
				const user = $(this).find('div.content__text > a').text()
				const username = $(this).find('div.content__text > p').text()
				result.push({ user, username, user_url })
				const hasil = {
					result: result
				}
				resolve(hasil)
			})
		}).catch(reject)
	})
}
async function ttUser (url) {
	return new Promise(async(resolve, reject) => {
		axios.get(url).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div')
			main.each( function() {
				const idVid = 'https://brainans.com'+$(this).find('a').attr('href')
				const upload_at = $(this).find('span').text()
				const desc = $(this).find('p').text()
				const user = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > div > a > h1').text()
				const username = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > div > h4').text()
				const video_count = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1) > strong').text()
				const followers = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2) > strong').text()
				const following = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3) > strong').text()
				const likes = $('#user-page > div.user.container > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(4) > strong').text()
				const bio = $('#user-page > div.user.container > div > div.col-md-5.my-3 > div').text()
				const thumb = $('#user-page > div.user.container > div > div.col-md-3.col-4.my-3 > div').attr('style').replace("background-image: url('", '').replace("');", '') 
				result.push({ idVid, upload_at, desc })
				const hasil = {
					user: user,
					username: username,
					video_count: video_count,
					followers: followers,
					following: following,
					likes: likes,
					bio: bio,
					thumb: thumb,
					video: result
				}
				resolve(hasil)
			})
		}).catch(reject)
	})
}
function getVid (url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(res => {
			const $ = cheerio.load(res.data)
			const obj = {}
			obj.link = $('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__image-container > div > video').attr('src')
			obj.like = $('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(1) > span').text()
			obj.comment = $('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(2) > span').text()
			obj.share = $('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(3) > span').text()
			resolve(obj)
		}).catch(reject)
	})
}
async function randomTiktok(query) {
	return new Promise( async(resolve, reject) => {
		await axios.get('https://brainans.com/search?query='+query).then(response => {
			const $ = cheerio.load(response.data)
			const User = $('#search-container > div:nth-child(1) > div.content__text > a').attr('href')
			axios.get('https://brainans.com/'+User).then(respon => {
				const soup = cheerio.load(respon.data)
				const Vidlink = []
				const main = soup('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div > div > a')
				main.each( function() {
					const Vlink = 'https://brainans.com/'+soup(this).attr('href')
					Vidlink.push(Vlink)
				})
				pickrandom(Vidlink).then(res => {
				axios.get(res).then(resp => {
					const ch = cheerio.load(resp.data)
					const result = {
						username: ch('#card-page > div > div.row > div > div > div > div > div.main__user-desc.align-self-center.ml-2 > a').text(),
						caption: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__list').text(),
						likes: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div > div:nth-child(1) > span').text(),
						comment: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(2) > span').text(),
						share: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(3) > span').text(),
						video: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__image-container > div > video').attr('src')
					}
					resolve(result)
				})		
				}).catch(resolve)
			}).catch(resolve)
		}).catch(resolve)
	})
}
async function tiktokHastag(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://tiktokder.com/hashtag/'+query).then(resp => {
			const $ = cheerio.load(resp.data)
			const Vidlink = []
			const main = $('body > div.videos-grid > div > a')
			main.each(function() {
				const URL = 'https://tiktokder.com'+$(this).attr('href')
				Vidlink.push(URL)
			})
			pickrandom(Vidlink).then(res => {
				axios.get(res).then(respon => {
					const ch = cheerio.load(respon.data)
					resolve({
						url: ch('#tiktok-video-result > div > div.download-buttons > div > a').attr('href').replace('https://savetiknowm.org/?tiktok_url=', ''),
						usernameNick: ch('#tiktok-video-result > div > div.result > div:nth-child(2) > div.profile > a.user-nickname').text(),
						username: ch('#tiktok-video-result > div > div.result > div:nth-child(2) > div.profile > a.username').text(),
						description: ch('#tiktok-video-result > div > div.result > div:nth-child(2) > p').text(),
						nowm: 'https://tyz-api.herokuapp.com/downloader/tiktoknowm?link='+ch('#tiktok-video-result > div > div.download-buttons > div > a').attr('href').replace('https://savetiknowm.org/?tiktok_url=', ''),
						original: ch('#tiktok-video-result > div > div.download-buttons > a').attr('href')
					})
				})
			})
		}).catch(reject)
	})
}
// Yang lain nya bonus aja:D
module.exports = randomTiktok 
module.exports = tiktokHastag
