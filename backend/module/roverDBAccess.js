var log4js= require('log4js')
var Rover = require('../model/roverModel')
var logger = log4js.getLogger('ROVER DB ACCESS')

logger.level = 'debug'
var RoverDBAccess = function() {}

RoverDBAccess.prototype.findSingleRover = function(roverData, callback) {
    Rover.findOne({roverName: roverData.roverName}, function(error, docs) {
        if(!error && docs) {
            callback({code: '00', message: 'success', data: docs})
        } else {
            callback({code: '01', message: 'Rover: ' + roverData.roverName + ' Was not found. ' })
        }
    })
}

RoverDBAccess.prototype.addRover = function(roverData, callback) {
    logger.debug('ROVER DATA MODEL!')
    Rover.findOne({roverName: roverData.roverName}, function(error, docs) {
        if(!error && docs) {
            callback({code: '01', message: 'This rover already exists'})
        } else {
            var rover = new Rover({
                roverName : roverData.roverName,
                currentPosition : {
                    x : 0,
                    y : 0,
                    orientation: 'N'
                }
            })

            rover.save(function(saveErr, saveDocs) {
                if(!saveErr && saveDocs) {
                    callback({code: '00', message: 'success', data: saveDocs})
                } else {
                    callback({code: '01', message: 'New rover was not saved. Please contact support.'})
                }
            })
        }
    })
}

RoverDBAccess.prototype.checkCurrentPosition = function(RoverDataArr, callback) {
    if(RoverDataArr.length == 3) {
        Rover.findOne({roverName: 'falcon heavy'}, function(error, docs) {
            if(!error && docs) {
                callback({code:'00', message:'success', data: docs})
            } else {
                callback({code: '01', message: 'Rover Falcon Heavy is still en-route to Plateu Earthchild 911, on Planet Mars.'})
            }
        })
    } else {
        callback({code: '01', message: 'Incorrect number of position parameters'})
    }
}

RoverDBAccess.prototype.addCurrentPosition = function(roverData, callback) {
    console.log()
    if(roverData.length == 3) {
        Rover.findOne({roverName: 'falcon heavy'}, function(error, docs) {
            if(!error && docs) {
                docs.currentPosition.x = parseInt(roverData[0])
                docs.currentPosition.y = parseInt(roverData[1])
                docs.currentPosition.orientation = roverData[2]

                docs.save(function(saveErr, saveData) {
                    if(!saveErr && saveData) {
                        callback({code:'00', message:'success', data: saveData})
                    } else {
                        callback({code: '01', message: 'Failed to save current position'})
                    }
                })
            } else {
                callback({code: '01', message: 'Rover Falcon Heavy is still en-route to Plateu Earthchild 911, on Planet Mars.'})
            }
        })
    } else {
        callback({code: '01', message: 'Incorrect number of position parameters'})
    }
}

module.exports = new RoverDBAccess()