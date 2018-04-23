var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RoverSchema = new Schema({
    roverName : {type: String, required: false, default: ''},
    currentPosition : {
        x : {type: Number, required: false, default: 0},
        y : {type: Number, required: false, default: 0},
        orientation: {type: String, required: false, default: ''}
    }
})

module.exports = mongoose.model('roverModel', RoverSchema)