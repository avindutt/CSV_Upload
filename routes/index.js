const express = require('express');

const router = express.Router();

const home = require('../controller/homeController');

router.get('/', home.index);
router.use('/filepreview', require('./files'));
router.post('/uploads', home.uploadFile);

module.exports = router;