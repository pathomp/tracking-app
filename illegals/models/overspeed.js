const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator');

const config = require('../config')

const DataSchema = new mongoose.Schema({
        gps_id : String,
        start_time : String,
        type : Number,
        speed : Number
},{ collection: 'illegals_overspeed'})

// DataSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('illegals_overspeed', DataSchema)