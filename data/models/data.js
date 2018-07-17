const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const config = require('../config')

const DataSchema = new mongoose.Schema({
        geometry : {
            type : { type: String, default: 'Point'},
            coordinates: []
        },
        DB_TIME : { type: Date, default: Date.now},
        GPS_TIME : { type: Date, default: Date.now},
        VENDOR_TIME : { type: Date, default: Date.now},
        SPEED : Number,
        IMEI : String,
        VENDOR_ID : Number,
        ENGINE : Number,
        HEADING : Number,
        SAT_NO : Number,
        RSSIT : Number
},{ collection: 'data'})

DataSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('data', DataSchema)