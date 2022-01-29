var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors');
var server = express();

server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

server.use(cors());

server.new = function (object) {
    return JSON.parse(JSON.stringify(object));
};

consign({cwd: process.cwd()})
    .then('config/mongoose.js')
    .then('mongoose/collections')
    .then('routes')
    .into(server);

server.listen(process.env.PORT || 5000)