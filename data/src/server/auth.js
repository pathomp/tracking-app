'use strict'

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
    if (authenticated) {
        return next()
    }

    return next(new Error('403 Invalid Access Token'));
}

module.exports = {
    isAuthenticated: isAuthenticated
}