const axios = require('axios');
const cheerio = require('cheerio');

function Search(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://www.mynimeku.com/?s='+query).then(res => {
            const $ = cheerio.load(res.data)
            const result = []
            const hasil = []
            $('body > main > div > div > div.flexbox2 > div > div').each( function(a, b) {
                const url = $(b).find('a').attr('href')
                const thumb = $(b).find('a > div > img').attr('src')
                const title = $(b).find('a > div > img').attr('alt')
                result.push({ url, thumb, title })
                result.forEach(v => {
                    if(!/anime/.test(v.url)) return
                    hasil.push(v)
                })
            })
            resolve(hasil)
        }).catch(reject)
    })
}
function animeDetail(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            const $ = cheerio.load(res.data)
            const _eps = []
            $('#episode_list > ul > li').each( function(a, b) {
                const link = $(b).find('div > div.flexeps-infoz > a').attr('href')
                const title = $(b).find('div > div.flexeps-infoz > a').attr('title')
                _eps.push({ link, title })
            })
            const result = {
                thumb: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-thumb > img').attr('src'),
                title: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-titlex > h2').text(),
                title_japanese: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-titlex > span').text(),
                rating: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-infoz.score > span').text(),
                musim: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(3) > span > a').text(),
                studio: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(4) > span > a').text(),
                episode: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(5) > span').text(),
                aired: $('body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(6) > span').text(),
                genre: $('body > main > div > div > div.container > div.series-flex > div.series-flexright > div.series-genres').text(),
                synopsis: $('body > main > div > div > div.container > div.series-flex > div.series-flexright > div.series-synops > p').text(),
                episode_list: _eps
            }
            resolve(result)
        }).catch(reject)
    })
}
function downloadEps(url) { 
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            const $ = cheerio.load(res.data)
            const dl_link = {
                low: {
                    uptobox: $('#linklist > p:nth-child(10) > a:nth-child(1)').attr('href'),
                    mega: $('#linklist > p:nth-child(10) > a:nth-child(2)').attr('href'),
                    zippyshare: $('#linklist > p:nth-child(10) > a:nth-child(3)').attr('href'),
                },
                medium: {
                    uptobox: $('#linklist > p:nth-child(13) > a:nth-child(1)').attr('href'),
                    mega: $('#linklist > p:nth-child(13) > a:nth-child(2)').attr('href'),
                    zippyshare: $('#linklist > p:nth-child(13) > a:nth-child(3)').attr('href'),
                },
                high: {
                    uptobox: $('#linklist > p:nth-child(16) > a:nth-child(1)').attr('href'),
                    mega: $('#linklist > p:nth-child(16) > a:nth-child(2)').attr('href'),
                    zippyshare: $('#linklist > p:nth-child(16) > a:nth-child(3)').attr('href')
                }
            }
            resolve(dl_link)
        }).catch(reject)
    })
}

module.exports = { Search, animeDetail, downloadEps }
