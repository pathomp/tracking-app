const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator');

const config = require('../config')

const DataSchema = new mongoose.Schema({
        driver_lic : String,
        start_time : String,
        stop_time : String,
        work_time : Number,
        rest_time : Number,
        status : String
},{ collection: 'illegals_drivetimes'})

// DataSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('illegals_drivetimes', DataSchema)