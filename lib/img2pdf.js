const pdfkit = require('pdfkit');
const sizes = require('./pdfSize.json');
const fetch = require('node-fetch');

/**
 *
 * @param {Array} images array of image
 * @param {String} size default A4
 * @returns
 */

function toPDF(images = [], size = 'A4') {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(images)) throw new TypeError('images must be an array');
    let _size = sizes[size];
    if (!_size) throw new Error('Size is invalid!');
    let buffs = [];
    const doc = new pdfkit({ margin: 0, size: sizes[size] });
    for (let img of images) {
      const resp = await fetch(img);
      const data = await resp.buffer();
      //const metadata = await sharp(data).metadata();
      doc.image(data, 0, 0, {
        fit: _size,
        align: 'center',
        valign: 'center',
      });
      doc.addPage();
    }
    // let write = stream2buffer();
    doc.on('data', (chunk) => buffs.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffs)));
    doc.on('error', (err) => reject(err));
    // let filepath = path.join(__dirname, '../tmp/' + (new Date() + 1) + '.pdf');
    // let stream = fs.createWriteStream(filepath);
    // doc.pipe(write);
    // write.on('finish', function () {
    //   resolve(Buffer.concat(this.data));
    // });
    doc.end();
  });
}


module.exports = {
  toPDF,
};