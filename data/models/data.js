const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const config = require('../config')

const DataSchema = new mongoose.Schema({
        geometry : {
            type : { type: String, default: 'Point'},
            coordinates: []
        },
        ts : { type: Date, default: Date.now},
        speed : Number,
        imei : String
},{ collection: 'data'})

DataSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('data', DataSchema)