const axios = require('axios')
const cheerio = require('cheerio')
                   
function pinterestdl(url) {
    return new Promise((resolve, reject) => {
        axios.request({
            url: 'https://www.expertsphp.com/facebook-video-downloader.php',
            method: "POST",
            data: new URLSearchParams(Object.entries({url: url})),
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const img = $('#showdata > div:nth-child(4) > table > tbody > tr:nth-child(2) > td:nth-child(1) > a').attr('href')
            const vid = $('#showdata > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').attr('href')
            const result = { img, vid }
                if (typeof vid == 'undefined') return resolve({ result: img })
                resolve({ result: vid })
        })
    })
}

module.exports = pinterestdl

