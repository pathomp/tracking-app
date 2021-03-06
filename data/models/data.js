const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const config = require('../config')

const DataSchema = new mongoose.Schema({
        geometry : {
            type : { type: String, default: 'Point'},
            coordinates: []
        },
        DB_TIME : { type: Date, default: Date.now},
        GPS_TIME : String,
        VENDOR_TIME : String,
        SPEED : Number,
        IMEI : String,
        VENDOR_ID : Number,
        ENGINE_STAT : Number,
        HEADING : Number,
        SAT_NO : Number,
        RSSI : Number
},{ collection: 'data'})

DataSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('data', DataSchema)