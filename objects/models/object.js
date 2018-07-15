const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const config = require('../config')

const DataSchema = new mongoose.Schema({

        name : String,
        imei : String,
        createdAt : { type: Date, default: Date.now},
        object_data : {}

},{ collection: 'objects'})

DataSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('objects', DataSchema)