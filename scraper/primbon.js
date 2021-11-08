const axios = require('axios');
const cheerio = require('cheerio');

function artinama(nama) {
	return new Promise((resolve, reject) => {
		axios.get('http://www.primbon.com/arti_nama.php?nama1='+nama+'&proses=+Submit%21+').then(res => {
		const $ = cheerio.load(res.data)
		const r = $('#body').text();
		const re = r.split('\n      \n        \n        \n')[0]
		const result = re.trim()
		resolve(result)
		})
	})
}

function ramalanJodoh(nama, pasangan) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+nama+'&nama2='+pasangan+'&proses=+Submit%21+').then(res => {
		const $ = cheerio.load(res.data)
		const thumb = 'https://www.primbon.com/'+$('#body > img').attr('src')
		const isi = $('#body').text().split(pasangan)[1].replace('< Hitung Kembali','').split('\n')[0]
      		const positif = isi.split('Sisi Negatif Anda: ')[0].replace('Sisi Positif Anda: ','')
      		const negatif = isi.split('Sisi Negatif Anda: ')[1]
      		const result = {
      			thumb: thumb,
      			positif: positif,
      			negatif: negatif
      		}
      		resolve(result)
		})

	})
}
module.exports = { artinama, ramalanJodoh }
