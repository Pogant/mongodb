const fs = require('fs');
const axios = require('axios');

const download_image = (url, image_path, callback) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => {
            return callback(image_path)
          })
          .on('error', e => reject(e));
      }),
  );

  exports.download_image = download_image