var express     = require('express')
var port        = require('./config/config').port
var log4js      = require('log4js')
var logger      = log4js.getLogger('SERVER')

logger.level    = 'debug'

var app         = express()

//~~~~~~~~ routes ~~~~~~~~~~
var mainRoutes  = require('./routes/routes')  

app.use(express.static(__dirname + '/public'))
app.use(mainRoutes)

app.listen(port, function() {
    logger.debug('LISTENING ON PORT: ' + port)
})