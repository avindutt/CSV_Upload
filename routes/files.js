const express = require('express');

const router = express.Router();

const filesController = require('../controller/filesController');

router.get('/:id', filesController.index);

module.exports = router;