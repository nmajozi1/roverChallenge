var express     = require('express')
var bodyParser  = require('body-parser')
var port        = require('./config/config').port
var dbUrl       = require('./config/config').mongoDB.url
var log4js      = require('log4js')
var logger      = log4js.getLogger('SERVER')
var mongoose    = require('mongoose')

logger.level    = 'debug'

var app         = express()

mongoose.connect(dbUrl, function(err) {
    if(err) {
        logger.fatal('Error connecting to Mongo DB.')
    } else {
        logger.info('Connection to mongo established.')
    }
})

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

//~~~~~~~~ routes ~~~~~~~~~~
var mainRoutes  = require('./routes/routes')  

app.use(mainRoutes)

app.listen(port, function() {
    logger.debug('LISTENING ON PORT: ' + port)
})