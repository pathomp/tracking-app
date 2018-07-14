const errors = require('restify-errors');
const User = require('../models/user')

module.exports = (server) => {

    server.get('/auth/', (req, res, next) => {
        res.send(200, {
            "create_user" : "/auth/register : {username,email,password}",
            "authentication": "/auth/basic : {email,password}"
        })
        next()
    })

    server.post('/auth/register', (req, res, next) => {
        if (!req.is('application/json')) {
            res.send(400, {"message" : "Body should be a Json object"})
        }
       
        let data = req.body || {}

        async function createUser(data) {
            let user
            try{
                user = await User.create(data)
                res.send(201, {"username" : user.username, "email" : user.email})
            } catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        createUser(data)
    })

    server.post('/auth/basic', (req, res, next) => {
        if (!req.is('application/json')) {
            res.send(400, {"message" : "Body should be a Json object"})
        }

        let data = req.body || {}

        async function authorization(data) {
            let user, authenticate, token
            try{

                user = await User.findOne({ email : data.email})
                if(!user) return res.send(403, {"message": "Email not found"})

                authenticate = await user.validPassword(data.password)
                if(!authenticate) return res.send(401, {"message": "Bad credentails"})

                token = await user.generateJWT()
                res.send(200, { "token_type" : "bearer","access_token" : token,"expires_in": "1h"})

            } catch(err) {
                res.send(500, {"message" : err.message})
            }
        }

        authorization(data)
    })
}