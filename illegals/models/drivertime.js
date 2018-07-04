const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator');

const config = require('../config')

const DataSchema = new mongoose.Schema({
        driver_lic : String,
        gps_time : String
},{ collection: 'illegals_drivetimes'})

// DataSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('illegals_drivetimes', DataSchema)