const multer = require('multer');
const path = require('path');
const CSV = require('../models/csv');

module.exports.index = async function(req, res){

    const csv = await CSV.find({});
    return res.render('home', {
        title: 'CSV Upload',
        csv
    });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single('csvFile');

  module.exports.uploadFile = async (req, res) => {

    upload(req, res, async (err) => {

    if (err){
        console.log('********upload error: ', err);
    }else{
        
        const filename = req.file.filename;
        const path = '../uploads/' + req.file.filename;
        
        const csv = await CSV.create({
        filename,
        path
        });
        await csv.save();
        return res.redirect('/');
        }
    });
};
