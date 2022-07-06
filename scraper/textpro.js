const axios = require('axios');
const FormData = require('form-data');
const { load } = require('cheerio');
const fetch = require('node-fetch')


//Copy disini punya Arul:v
function textpro(url, text = []) {
	return new Promise(async(resolve, reject) => {
		const _token = await axios.get(url)
		const cookie = _token.headers['set-cookie'].toString()
		const $ = load(_token.data)
		const token = $('#token').attr('value')
		const build_server = $('#build_server').attr('value')
		const build_server_id = $('#build_server_id').attr('value')
		const form = new FormData()
		for (let texts of text) {
			form.append("text[]", texts);
		}
		form.append('submit', 'Go')
		form.append('token', token)
		form.append('build_server', build_server)
		form.append('build_server_id', build_server_id)
		let body = await form.getBuffer()
		const geturl2 = await fetch(url, {
			method: "POST",
			headers: {
				Accept: "/",
				"Accept-Language": "en-US,en;q=0.9",
				"User-Agent": "GoogleBot",
				Cookie: cookie,
				...form.getHeaders(),
			},
			body: form.getBuffer(),
		})
		const caritoken2 = await geturl2.text();
		const $$ = load(caritoken2)
		const form2 = $$('#form_value').eq(0).text()
		let form_ = JSON.parse(form2)
		const json = await axios.request({
			url: "https://textpro.me/effect/create-image",
			method: "POST",
			data: new URLSearchParams(Object.entries( form_ )),
			headers: {
				Accept: "/",
				"Accept-Language": "en-US,en;q=0.9",
				"User-Agent": "GoogleBot",
				Cookie: cookie,
			}
		})
		resolve("https://textpro.me/" + json.data.fullsize_image)
	})
}

module.exports = {
	textpro
}