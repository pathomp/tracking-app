const errors = require('restify-errors');
const User = require('../models/user')

module.exports = (server) => {

    server.post('/auth/register', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'")
            )
        }
       
        let data = req.body || {}

        try{
            const user = await User.create(data)
            const token = await User.generateJWT()
            res.send(201, token)
        } catch(err) {
            res.send(500, {"message" : err.message})
        }

    })
}