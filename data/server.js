const restify = require('restify')
const mongoose = require('mongoose')
const logger = require('morgan')
const config = require('./config')
const jwt = require('jsonwebtoken') 
const corsMiddleware = require('restify-cors-middleware')

const isAuthenticated = (req, res, next) => {

  const authorization = req.headers.authorization
  if (!authorization || !(authorization.search('Bearer ') === 0)) {
      return next(new Error('Missing Authorization Header'))
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    return next(new Error('Missing Bearer Token'))
  }

  jwt.verify(token, config.tokenSettings.privateKey, function(err, decoded) {
    if (err) {
        return next(new Error('Invalid Access Token'))
    }
    next()
  })
}

const server = restify.createServer({
    name: config.name,
    version: config.version
})

const cors = corsMiddleware({
    // preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['Content-Type','Content-Length','Authorization'],
})

server.use(logger('dev'))
<<<<<<< HEAD
=======
// server.use(isAuthenticated)
>>>>>>> 42f7df8f2585157d826535ef3e3c7de7d975fcb8
server.pre(cors.preflight)
server.use(cors.actual)
server.use(isAuthenticated)
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(config.serverSettings.port, () => {
    console.log(`---${config.name} Service ---`)
    console.log(`Connecting to ${config.name} repository...`)
    mongoose.Promise = global.Promise
    mongoose.connect(config.dbSettings.url)

    const db = mongoose.connection

    db.on('error', (err) => {
        console.error(err)
        process.exit(1)
    })

    db.once('open',() => {
        console.log('Connected. Starting Server')
        require('./routes')(server)
        console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
    })
})

module.exports = server

