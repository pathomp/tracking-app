const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');

const config = require('../config')

const drivertimeschema = new mongoose.Schema({
    // username: String,
    // email: String,
    // gps_id : String,
    gps_time : String,
    driver_lic : String

})

module.exports = mongoose.model('illegals_drivetime', drivertimeschema)