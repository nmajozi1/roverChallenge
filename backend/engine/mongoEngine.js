var mongoose    = require('mongoose')
var dbUrl       = require('../config/config').mongoDB.url

var MongoEngine = function() {}

MongoEngine.prototype.createConnection = function(callback) {
    mongoose.connect(dbUrl, function(err) {
        if(err) {
            callback({code:'01', message: 'Unable to connect to Mongo DB.'})
        } else {
            callback({code: '00', message: 'Connection to Mongo DB established.'})
        }
    })
}

module.exports = new MongoEngine()