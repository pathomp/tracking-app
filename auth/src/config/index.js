const {ObjectID} = require('mongoose').Types.ObjectId
const {dbSettings, jwtSetting, serverSettings} = require('./config')
const db = require('./mongo')

module.exports = Object.assign({}, {dbSettings, jwtSetting, serverSettings, db, ObjectID})