const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const csv = require('csv-parser');

const db = require('./config/mongoose');

app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('view engine', 'ejs');

app.use(express.static('assets'));

app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('Error in connecting to server', err);
    }
    console.log('Successfully connected to port : ', port);
})