'use strict'

const _ = require('lodash');
const bcrypt = require('bcrypt')
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options

    // Register
    app.post('/auth/register',(req,res,next) => {
        const params = _.pick(req.body, 'email','password')

        var hash = bcrypt.hashSync(params.password, 10);

        res.status(status.OK).json(hash)
    })

    // Login
    app.post('/auth/login',(req, res, next) => {
        const params = _.pick(req.body, 'email','password')

        if (!params.email || !params.password) {
            return res.status(status.BAD_REQUEST).json({error: 'email, password ' +
            'are required parameters'})
        }

        repo.login(params.email,params.password).then(token => {
            res.status(status.OK).json({token:token})
        }).catch(next)
    })
}