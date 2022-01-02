const axios = require('axios');
const cheerio = require('cheerio');

function igDownload(Url) {
  return new Promise((resolve, reject) => {
    axios.get('https://snapinsta.app/', {
      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
      }
    }).then(res => {
      const cookie = res.headers[`set-cookie`][0].replace('; path=/', '')
      const data = {
        url: Url,
        action: 'post'
      }
      axios.request({
        url: 'https://snapinsta.app/action.php',
        method: 'post',
        data: new URLSearchParams(Object.entries(data)),
        headers: {
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
          'cookie': cookie
        }
      }).then(data => {
        const $ = cheerio.load(data.data)
        const result = []
        $('div.row.download-box > div.col-md-4').each((a, b) => {
          let link = $(b).find('div.download-items > div.download-items__btn > a.abutton').attr('href');
          result.push(link)
        })
        resolve(result)
      })
    })
  })
}

function igStalk(Username) {
  return new Promise((resolve, reject) => {
    axios.get('https://dumpor.com/v/'+Username, {
      headers: {
        "cookie": "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYWGhnNS1uWVNLUU81V1lzQ01MTVY2R0h1.fI2xB2dYYxmWqn7kyCKIn1baWw3b-f7QvGDfDK2WXr8",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data)
      const result = {
        profile: $('#user-page > div.user > div.row > div > div.user__img').attr('style').replace(/(background-image: url\(\'|\'\);)/gi, ''),
        fullname: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1').text(),
        username: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4').text(),
        post: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)').text().replace(' Posts',''),
        followers: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)').text().replace(' Followers',''),
        following: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)').text().replace(' Following',''),
        bio: $('#user-page > div.user > div > div.col-md-5.my-3 > div').text()
      }
      resolve(result)
    })
  })
}

function igStory(username) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: 'https://storydownloader.net/',
			method: 'GET',
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"		
			}
		}).then(response => {
			const ch = cheerio.load(response.data)
			const token = ch('#token').attr('value')
			let data = {
				token: token,
				username: username,
				stp: 1
			}
			axios.request({
				url: 'https://storydownloader.net/process/',
				method: 'POST',
				data: new URLSearchParams(Object.entries(data)),
				headers: {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": response.headers["set-cookie"],
					"accept": "application/json, text/javascript, */*; q=0.01"
				}
			}).then(res => {
				const hc = cheerio.load(res.data.html)
				const medias = []
				hc('figure').each(function (a, b) {
					const url = hc(b).find('img').attr('src')
					medias.push(url)
				})
				const hasil = {
					title: hc('h1').text(),
					profile_pic: hc('img').attr('src'),
					medias: medias
				}
				resolve(hasil)
			}).catch(reject)
		}).catch(reject)
	})
}

module.exports = { igStory, igStalk, igDownload }
