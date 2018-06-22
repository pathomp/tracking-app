'use strict'
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const cors = require('cors')
const spdy = require('spdy')
const api = require('../api/objects')
const auth = require('../config/auth')

const start = (options) => {
  return new Promise((resolve, reject) => {

    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }

    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(bodyparser.json())
    app.use(cors())
    app.use(helmet())
    app.use(auth.isAuthenticated)
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send(err)
    })
    
    api(app, options)

    const server = app.listen(options.port, () => resolve(server))
    // const server = spdy.createServer(options.ssl,app)
    //       .listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})