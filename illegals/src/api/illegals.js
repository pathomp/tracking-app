'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options
    
    app.get('/illegals/checkOverspeed/:speed', (req, res, next) => {
        repo.checkOverspeed(req.params.speed)
            .then(illegal => {
                res.status(status.OK).json({illegal})
            }).catch(e => {
                res.status(500).json(e)
            })
    })
}