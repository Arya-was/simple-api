const fetch = require('node-fetch')
const cheerio = require('cheerio')
                   
function pinterestdl(url) {
    return new Promise((resolve, reject) => {
        let params = new URLSearchParams()
        params.append('url', url)
        fetch('https://www.expertsphp.com/facebook-video-downloader.php', { method: 'POST', body: params })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                var img = $('#showdata > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(1) > a').attr('href')
                var vid = $('#showdata > div:nth-child(5) > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').attr('href')
                const result = { img, vid }
                if (typeof vid == 'undefined') return resolve({ result: img })
                resolve({ result: vid })
            }).catch(reject)
    })
}

module.exports = pinterestdl

