__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', async(req, res) => {
	const config = `{
		tiktok: "/downloader/tiktok?link=https://vm.tiktok.com/ZSJcLPNpe/",
		mediaFire: "/downloader/mediafireDl?link=https://www.mediafire.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file",
		igdl: "/downloader/igdl?link=https://www.instagram.com/p/CTEDAEbpE4A/?utm_source=ig_web_copy_link",
		waifu_image: "/randomimg/waifu",
		cosplay_image: "/randomimg/cosplay",
		husbu_image: "/randomimg/husbu",
		loli_image: "/randomimg/loli",
		milf_image: "/randomimg/milf",
		pinterest: "/search/pinterest?query=anime",
		google: "/search/google?query=anime"
	}`
	res.send(config)
})

//Kalo page yang di cari engga ada, nanti muncul ini:v
router.use(function (req, res) {
res.status(404)
.send('Yang kamu cari engga ada bang:v')
});

module.exports = router