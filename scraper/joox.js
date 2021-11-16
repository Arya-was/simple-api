const axios = require("axios")

function joox(query) {
    return new Promise((resolve, reject) => {
        const time = Math.floor(new Date() / 1000)
        axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
            .then(({ data }) => {
                let result = []
                let hasil = []
                let promoses = []
                let ids = []
                data.itemlist.forEach(result => {
                    ids.push(result.songid)
                });
                for (let i = 0; i < data.itemlist.length; i++) {
                    const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
                    promoses.push(
                        axios.get(get, {
                            headers: {
                                Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
                            }
                        })
                            .then(({ data }) => {
                                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                                hasil.push({
                                    lagu: res.msong,
                                    album: res.malbum,
                                    penyanyi: res.msinger,
                                    publish: res.public_time,
                                    img: res.imgSrc,
                                    mp3: res.mp3Url
                                })
                                Promise.all(promoses).then(() => resolve({
                                    status: true,
                                    data: hasil,
                                }))
                            }).catch(reject)
                    )
                }
            }).catch(reject)
    })
}
function jooxdl (url) {
    const URL = url.replace('https://www.joox.com/id/single/', '')
    return new Promise((resolve, reject) => {
        axios.get('http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid='+URL, {
            headers: {
                Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
            }
            }).then(res => {
                const result = JSON.parse(res.data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                const hasil = {
                    lagu: result.msong,
                    album: result.malbum,
                    penyanyi: result.msinger,
                    publish: result.public_time,
                    img: result.imgSrc,
                    mp3: result.mp3Url
                }
                resolve(hasil)
            }).catch(reject)
    })
}
module.exports = { jooxdl, joox }
