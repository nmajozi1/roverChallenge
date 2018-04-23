var Rover   = require('./model/roverModel')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Platfotm45', function(err) {
    if(err) {
        console.log('Error connecting to Mongo DB')
    } else {
        var rover = new Rover({
            roverName : 'falcon heavy',
                currentPosition : {
                    x : 0,
                    y : 0,
                    orientation: 'N'
                }
        }) 

        rover.save(function(error, docs) {
            if(!error && docs) {
                console.log('Project has been initialised successfully. Please run the server.js file to get started.')
            } else {
                console.log('Project failed to initialise. Unable to save the Rover table.')
            }
        })
    }
})