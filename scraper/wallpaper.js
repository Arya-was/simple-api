const axios = require('axios');
const cheerio = require('cheerio');

function alphacoders(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://wall.alphacoders.com/search.php?search='+query).then(res => {
            const $ = cheerio.load(res.data)
            const result = []
            $('div.boxgrid > a > picture').each(function(a, b) {
                result.push($(b).find('img').attr('src').replace('thumbbig-', ''))
            })
            resolve(result)
        }).catch(reject)
    })
}

function wallpaperflare(query) {
    return new Promise((resolve, reject) => {
		axios.get('https://www.wallpaperflare.com/search?wallpaper='+ query,{
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
			}
		})
		.then(res => {
			const $ = cheerio.load(res.data)
			const result = [];
			$('#gallery > li > figure > a').each(function(a, b) {
				result.push($(b).find('img').attr('data-src'))
			})
			resolve(result)
	    }).catch(reject)
    })
}

function wallpaperscraft(query) {
    return new Promise((resolve, reject) => {
		axios.get('https://wallpaperscraft.com/search/?query='+query).then(res => {
			const $ = cheerio.load(res.data)
			const result = [];
			$('span.wallpapers__canvas').each(function(a, b) {
				result.push($(b).find('img').attr('src'))
			})
			resolve(result)
		}).catch(reject)
	})
}


function wallpapercave(query) {
    return new Promise((resolve, reject) => {
		axios.get('https://wallpapercave.com/search?q='+query).then(res => {
				const $ = cheerio.load(res.data)
				const result = [];
				$('div.imgrow > a').each(function(a, b) {
					if (!$(b).find('img').attr('src').includes('.gif')) {
						result.push('https://wallpapercave.com/' + $(b).find('img').attr('src').replace('fuwp', 'uwp'))
					}
				})
				resolve(result)
			}).catch(reject)
	})
}

module.exports = { wallpapercave, wallpaperscraft, wallpaperflare, alphacoders }
