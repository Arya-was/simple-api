//Source: https://github.com/ariffb25/stikerinbot recode by Me!
const axios = require('axios')
const cheerio = require('cheerio')
const qs = require('qs')

let is = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
        "cookie": "pll_language=en; PHPSESSID=58578e38aa296f5a12a495fc5e5f0c2e"
    }
}

function _token(host) {
    return new Promise(async (resolve, reject) => {
        axios.request({
            url: host, method: 'GET', headers: {
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                "cookie": "pll_language=en; PHPSESSID=58578e38aa296f5a12a495fc5e5f0c2e"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let token = $('#token').attr('value')
            resolve(token)
        })
    })
}

function dl(url) {
    return new Promise(async (resolve, reject) => {
        let host = 'https://aiovideodl.ml/'
        let form = { data: { 'url': url, 'token': (await _token(host)) } }
        axios.post(host + 'wp-json/aio-dl/video-data/', qs.stringify(form.data), { headers: is.headers })
            .then(({ data }) => {
                if (data == 'error') return resolve({ message: 'Error!' })
				resolve(data)
				console.log(data)
			})
    })
}
module.exports = { dl }
