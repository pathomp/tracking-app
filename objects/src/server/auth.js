'use strict'

const _ = require('lodash')
const jwt = require('../config/jwt')

const isAuthenticated = (req, res, next) => {
    
    // Guard clauses
    const authorization = req.headers.authorization
    if (!authorization || !(authorization.search('Bearer ') === 0)) {
        return next(new Error('401 Missing Authorization Header'));
    }

    const token = authorization.split(' ')[1]
    if (!token) {
        return next(new Error('401 Missing Bearer Token'));
    }

    const authenticated = jwt.verifyToken(token)
    if (_.isNil(authenticated)) {
        return next(new Error('403 Invalid Access Token'));
    }

    return next()

}

module.exports = {
    isAuthenticated: isAuthenticated
}