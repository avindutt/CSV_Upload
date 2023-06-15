const fs = require('fs');
const csv_parser = require('csv-parser');
const CSV = require('../models/csv');
const path = require('path');

module.exports.index = async function(req, res) {

    const filePreview = await CSV.findById(req.params.id);
    const absolutePath = path.join(__dirname, filePreview.path);

    // lets track the number of records processed
    let count = 0;
    let results = [];

  fs.createReadStream(absolutePath)
    .pipe(csv_parser())
    .on('data', (data) => {
      // check for max limit of 100 records per page
        if(count < 100) {
          results.push(data);
          count++;
        }
    })
    .on('end', () => {
      const details = results;
      results = [];
          return res.render('fileDetails', {
              title: 'File Preview',
              details,
              originalname: filePreview.originalname
          });
    });
}