const axios = require('axios');
const cheerio = require('cheerio');

const randomarray = async (array) => {
	return array[Math.floor(Math.random() * array.length)]
}

const result = []

function merdekaNews() {
    return new Promise(async(resolve, reject) => { 
    const jsonIndex = ['index2', 'index3', 'index4', 'index5']
    const randIndex = await randomarray(jsonIndex)
    axios.get(`https://www.merdeka.com/peristiwa/${randIndex}/`).then(res => {
        const $ = cheerio.load(res.data)
        $('#mdk-content-center > div.inner-content > ul > li > div').each(function(a, b) {
            const link = 'https://www.merdeka.com' + $(b).find('h3 > a').attr('href')
            const title = $(b).find('h3').text()
            const upload_date= $(b).find('div > span').text().trim()
			const thumb = $(b).find('div > a > img').attr('src')
            result.push({ link, title, upload_date, thumb })
        })
        resolve(result)
    }).catch(reject)
})
}


module.exports = { merdekaNews }
