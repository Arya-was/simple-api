const axios = require('axios');

async function akanekoApi(param) {
	return new Promise(async(resolve, reject) => {
		const data = await axios.get('https://akaneko-api.herokuapp.com/api/'+param)
		resolve(data.data.url)
	})
}

module.exports = { akanekoApi }
