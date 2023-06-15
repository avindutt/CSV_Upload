const fs = require('fs');
const csv_parser = require('csv-parser');
const CSV = require('../models/csv');
let results = [];
const path = require('path');

module.exports.index = async function(req, res) {

    const filePreview = await CSV.findById(req.params.id);
    const absolutePath = path.join(__dirname, filePreview.path);

fs.createReadStream(absolutePath)
  .pipe(csv_parser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    const details = results;
    results = [];
        return res.render('fileDetails', {
            title: 'Preview',
            details
        });
  });
}