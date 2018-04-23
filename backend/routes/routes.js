var express     = require('express')
var RoverModule = require('../module/roverModule') 
var log4js      = require('log4js')
var path        = require('path')
var logger      = log4js.getLogger('ROUTES')

logger.level    = 'debug'

var router = express.Router()

// ~~~~~~~~~~~~~~~~~~~~~~ ADD A NEW ROVER 
router.post('/addRover', function(req, res) { 
    
    var roverData = req.body

    logger.debug('ROVER DATA: ' + roverData.roverName)

    RoverModule.addRover(roverData, function(response) {
        res.send(response)
    })
})

// ~~~~~~~~~~~~~~~~~~~~~~ INITIATE MOVE ROVER
router.post('/moveRover', function(req, res) {

    var moveRoverData = req.body

    RoverModule.validateMove(moveRoverData, function(response) {
        res.send(response)
    })
})

module.exports = router