const restify = require('restify')
const logger = require('morgan')

const server = restify.createServer({
    name: 'illegals',
    version: '1.0.0'
})

server.use(logger('dev'))
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/illegal/checkSpeed/', (req, res, next ) => {
    try {
        const data = req.body
        if(data.speed > 80){
            res.send(200,"Overspeed")
        }else{
            res.send(200,"Not")
        }
        
    } catch (error) {
        res.send(500, "Hello")
    }

})

server.listen(3000, function () {
    console.log(`Server start`)
})