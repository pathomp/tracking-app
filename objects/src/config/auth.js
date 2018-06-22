'use strict'

const config = require('./config')
const jwt = require('jsonwebtoken')

const secretKey = config.jwtSetting.secretKey

const isAuthenticated = (req, res, next) => {

  const authorization = req.headers.authorization
  if (!authorization || !(authorization.search('Bearer ') === 0)) {
      return next({code:401, message: 'Missing Authorization Header'})
  }

  const token = authorization.split(' ')[1]
  if (!token) {
      return next({code:401, message: 'Missing Bearer Token'})
  }

  jwt.verify(token, secretKey, function(err, decoded) {
    if (err) {
      return next({code:401, message: 'Invalid Access Token'})
    }
    next()
  })
}

module.exports = Object.assign({},{ isAuthenticated })