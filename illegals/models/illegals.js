const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator');

const config = require('../config')

const DataSchema = new mongoose.Schema({
        imei : String,
        driver_lic : String,
        type : Number,
        time : String,
        illegals_name : String,
        status : String
},{ collection: 'illegals'})

// DataSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('illegals', DataSchema)