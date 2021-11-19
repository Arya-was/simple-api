const axios = require ('axios')

function searchIlust(query) {
	return new Promise((resolve, reject) => { 
		axios.get('https://api.lolicon.app/setu/v2?&size=regular&num=100&keyword='+query).then(res => {
			const result = res.data.data
      if (result.length < 1) {
          throw 'Hasil tidak di temukan!'
      } else {
        resolve(result)
      }
		})
	})
}

function pixivDownload(id, ext) {
	return new Promise((resolve, reject) => {
		const result = 'https://pixiv.cat/'+id+ext
		resolve(result)
	})
}

module.exports = { searchIlust, pixivDownload }
