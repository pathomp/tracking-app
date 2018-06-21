'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options
    
    app.post('/objects/updateObjectData', (req, res, next) => {
        repo.updateObjectData(req.body.data)
            .then(object => {
                res.status(status.OK).json({object})
            }).catch(e => {
                res.status(500).json(e)
            })
    })

    app.get('/objects/:objectId',(req, res, next) => {
        repo.getObjectById(req.params.objectId).then(object => {
            res.status(status.OK).json(object)
        }).catch(next)
    })

    app.get('/objects/',(req, res, next) => {
        repo.getAllObjects().then(object => {
            res.status(status.OK).json(object)
        }).catch(next)
    })
}