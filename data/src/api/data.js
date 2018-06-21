'use strict'
const status = require('http-status')
const services = require('../services')

module.exports = (app, options) => {
    const {repo} = options
    
    app.post('/data/makeData', (req, res, next) => {
        const objectService = services.objectService
        
        repo.makeData(req.body.data)
            .then(data => {
                objectService(data)
                res.status(status.OK).json(data)
            }).catch(next)
    })

    app.get('/data/:IMEI',(req, res, next) => {

        repo.getDataByIMEI(req.params.IMEI).then(data => {
            res.status(status.OK).json(data)
        }).catch(next)
    })
}