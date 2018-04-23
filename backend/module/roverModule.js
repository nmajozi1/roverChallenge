var DBAccess    = require('./roverDBAccess')
var PlateauParams= require('../config/config').plateauParameters
var log4js      = require('log4js') 
var logger      = log4js.getLogger('ROVER MODULE')

logger.level    = 'debug'

var RoverMod = function() {}


// ~~~~~~~~~~~~~~~~~~~~~~ ADD A NEW ROVER 
RoverMod.prototype.addRover = function(roverData, callback) {
    logger.debug('ROVER DATA MODULE!')
    DBAccess.addRover(roverData, function(response) {
        callback(response)
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~ MOVE THE ROVER
RoverMod.prototype.moveRover = function(roverData, callback) {
    DBAccess.moveRover(roverData, function(response) {
        if(response.data.code = '00') {
            console.log('Now we must move the rover.')
        } else {
            callback(response)
        }
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~ VALIDATE  
RoverMod.prototype.validateMove = function(roverData, callback) {
    if(roverData.position) {
        var roverPositionArr = roverData.position.split(" ")
        var instrArr = roverData.instruction.split("")

        validateInstrArr(instrArr, function(validInstr) {
            if(validInstr.code == '00') {
                if(roverPositionArr.length !== 3) {
                    callback({code:'01', message:'Invalid position type. Please ensure that the position is splace delimted.'})
                } else {
                    if(roverPositionArr[2] == 'N' || roverPositionArr[2] == 'S' || roverPositionArr[2] == 'E' || roverPositionArr[2] == 'W') {
                        DBAccess.addCurrentPosition(roverPositionArr, function(response) {
                            if(response.code == '00') {
                                findNextPosition(response.data, instrArr, function(nexPosition) {
                                    callback(nexPosition)
                                })
                            } else {
                                callback(response)
                            }
                        })
                    } else {
                        callback({code:'01', message:'Invalid position type. Please use N, E, W, or S for the direction the rover is facing.'})
                    }
                }
            } else {
                callback(validInstr)
            }
        })
    }  else {
        logger.info('NOT FOUND!!')
    }
}


// ~~~~~~~~~~~~~~~~~~~~~~ VALIDATE THE INSTRUCTION STRING 
function validateInstrArr(instrArr, callback) {
    var foundInvalid = false
    var x = 0
    while(x < instrArr.length) {
        if(instrArr[x] == 'L' || instrArr[x] == 'R' || instrArr[x] == 'M') {
            // DO NOTHING
        } else {
            foundInvalid = true    
        }
        x++
    }

    if(!foundInvalid) {
        callback({code: '00', message:'success'})
    } else {
        callback({code: '01', message: 'Instructions must be L, R or M'})
    }
}


// ~~~~~~~~~~~~~~~~~~~~~~ FIND THE NEXT POSITION
function findNextPosition(currentPos, instrArr, callback) {
    // var instrOptions = ['L', 'R', 'M']
    if(instrArr.length > 0) {
        var x = 0
        while(x < instrArr.length) {
            logger.debug(instrArr[x])
            if(instrArr[x] == 'L' && currentPos.currentPosition.orientation == 'N') {
                currentPos.currentPosition.orientation = 'W'
                currentPos.save()
            } else if(instrArr[x] == 'L' && currentPos.currentPosition.orientation == 'W') {
                currentPos.currentPosition.orientation = 'N'
                currentPos.save()
            } else if(instrArr[x] == 'L' && currentPos.currentPosition.orientation == 'S') {
                currentPos.currentPosition.orientation = 'E'
                currentPos.save()
            } else if(instrArr[x] == 'L' && currentPos.currentPosition.orientation == 'E') {
                currentPos.currentPosition.orientation = 'S'
                currentPos.save()
            } else if(instrArr[x] == 'R' && currentPos.currentPosition.orientation == 'N') {
                currentPos.currentPosition.orientation = 'E'
                currentPos.save()
            } else if(instrArr[x] == 'R' && currentPos.currentPosition.orientation == 'E') {
                currentPos.currentPosition.orientation = 'S'
                currentPos.save()
            } else if(instrArr[x] == 'R' && currentPos.currentPosition.orientation == 'S') {
                currentPos.currentPosition.orientation = 'W'
                currentPos.save()
            } else if(instrArr[x] == 'R' && currentPos.currentPosition.orientation == 'W') {
                currentPos.currentPosition.orientation = 'N'
                currentPos.save()
            } else if(instrArr[x] == 'M' && currentPos.currentPosition.orientation == 'N') {
                currentPos.currentPosition.y += 1
                currentPos.save()
            } else if(instrArr[x] == 'M' && currentPos.currentPosition.orientation == 'S') {
                currentPos.currentPosition.y -= 1
                currentPos.save()
            } else if(instrArr[x] == 'M' && currentPos.currentPosition.orientation == 'E') {
                currentPos.currentPosition.x += 1
                currentPos.save()
            } else if(instrArr[x] == 'M' && currentPos.currentPosition.orientation == 'W') {
                currentPos.currentPosition.x -= 1
                currentPos.save()
            }
            x++
        }

        logger.debug(currentPos)
        var respString = currentPos.currentPosition.x + ' ' + currentPos.currentPosition.y + ' ' + currentPos.currentPosition.orientation 
        callback({code:'00', message: 'success', data: respString})
    } else {
        callback({code:'01', message:'There is no instruction to move.'})
    }
}

module.exports = new RoverMod()