const cheerio = require('cheerio')
const axios = require('axios')

function doujindesu(query){
        return new Promise(async(resolve,reject) => {
          axios.get('https://doujindesu.id/?s=' + query).then(({ data }) => {
            const $ = cheerio.load(data)
            const result = [];
              $('div.animposx').get().map(b => {
              const thumb = $(b).find('img').attr('src')
              const title =  $(b).find('h2').text()
              const score = $(b).find('div.score').text()
              const status = $(b).find('div.type').text()
              const link = $(b).find('a').attr('href')
              result.push({thumb, title, score, status, link})
              });
              resolve(result)
          })
        })
}

module.exports = doujindesu
