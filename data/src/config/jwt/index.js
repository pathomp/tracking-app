'use strict'

const config = require('../config')
const jwt = require('jsonwebtoken')

const expiresSecond = config.jwtSetting.expires_seconds
const secretKey = config.jwtSetting.secretKey

const generateToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            email: user.email,
            role: user.role
        }
        const token = jwt.sign({
            payload
        }, secretKey, { expiresIn: expiresSecond * 100 })

        resolve(token)
    })
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        console.log(token)
        jwt.verify(token, secretKey, function(err, decoded){
            if(err) {
                reject(new Error('403 Invalid Access Token'))
            }
            resolve(decoded)
        })
    })
}

module.exports = Object.assign({}, { generateToken, verifyToken })