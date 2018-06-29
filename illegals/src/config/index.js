const {ObjectID} = require('mongoose').Types.ObjectId
const {dbSettings, serverSettings} = require('./config')
const db = require('./mongo')

module.exports = Object.assign({}, {dbSettings, serverSettings, db, ObjectID})