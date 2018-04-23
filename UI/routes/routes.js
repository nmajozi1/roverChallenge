var express     = require('express')
var log4js      = require('log4js')
var path        = require('path')
var config      = require('../config/config')
var request     = require('request')
var logger      = log4js.getLogger('ROUTES')

logger.level    = 'debug'

var router = express.Router()

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'))
})

router.post('/addRover/:addRover', function(req, res) {
    var roverData = JSON.parse(req.params.addRover)
    console.log('THE URL: ' + config.addRoverUrl)
    request({
        method:'POST',
        url: config.addRoverUrl,
        json:roverData
    }, function (error, body, response) {
        if (!error && body) {
            res.send(response)
        } else {
            res.send(response)
        }
    })
})

router.post('/moveRover/:ToDo', function(req, res) {
    var moveData = JSON.parse(req.params.ToDo)

    request({
        method: 'POST',
        url:config.moveRoverUrl,
        json: moveData
    }, function(error, body, response) {
        if(!error && body) {
            res.send(response)
        } else {
            res.send(response)
        }
    })
})

module.exports = router