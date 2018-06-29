const restify = require('restify')
const mongoose = require('mongoose')
const logger = require('morgan')
const config = require('./config') 

const server = restify.createServer({
    name: config.name,
    version: config.version
})

server.use(logger('dev'))
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(config.serverSettings.port, () => {
    console.log('---Auth Service ---')
    console.log('Connecting to auth repository...')
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