'use strict'

const bcrypt = require('bcrypt')
const jwt = require('../config/jwt')

const repository = (connection) => {

    const {db, ObjectID} = connection
    const collection = db.collection('users')

    const verifyUser = (email) => {
        return new Promise((resolve, reject) => {
            const query = { email: email }
            collection.findOne(query, (err, user) => {

                if(err) {
                    reject(new Error('An error occured fetching user, err:' + err))
                }

                resolve(user)
            })
        })
    }

    // Login
    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            verifyUser(email)
                .then(user => {
                    const passwordIsValid = bcrypt.compareSync(password, user.password);

                    if (!passwordIsValid) {
                        reject(new Error('Incorrect password'))
                    }

                    const token = jwt.generateToken(user)

                    resolve(token)
                })
        })
    }

    const isAuthenticated = (token) => {
        return new Promise((resolve, reject) => {
            const authenticated = jwt.verifyToken(token)
            console.log(authenticated)
        })
    }

    const disconnect = () => (
        db.close()
    )

    return Object.create({
        login,
        isAuthenticated,
        disconnect
    })
}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if(!connection) {
            reject(new Error('connection db not supplied!'))
        }
        resolve(repository(connection))
    })
}

module.exports = Object.assign({}, {connect})