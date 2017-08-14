// this file is our core server. Very simple, just serves public files and pulls in our /task router

var express = require('express');
var bodyParser = require('body-parser');
var task = require('./routes/task')

var app = express();

var port = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/task', task);

app.listen(port, function(){
    console.log('listening on port', port);
});