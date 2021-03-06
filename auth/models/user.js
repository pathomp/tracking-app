const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const config = require('../config')

const UserSchema = new mongoose.Schema({
    // username: String,
    // email: String,
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    hashedPassword: String
})

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.virtual('password')
    .set(function (password) {
        this.hashedPassword = this.encryptPassword(password)
    })
    .get(function (){
        return this.hashedPassword
    })

UserSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.validPassword = function(password)  {
    return bcrypt.compareSync(password,this.hashedPassword)
}

UserSchema.methods.generateJWT = function() {
    return jwt.sign({
        username: this.username,
        email: this.email   
    }, config.tokenSettings.privateKey, { expiresIn: config.tokenSettings.tokenExpiry })
}

module.exports = mongoose.model('users', UserSchema)