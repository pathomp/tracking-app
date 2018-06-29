const mongoose = require('mongoose')

let DB_URI = "mongodb://209.97.162.212:27017/tracking";

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', `mongodb://`)

  return `${url.substr(0, url.length - 1)}/${options.db}`
}

const connect = (options, mediator) => {  
  mediator.once('boot.ready', () => {
    mongoose.connect(getMongoURL(options), function(err,res){
      mediator.emit('db.ready', res)
    })
  })
}

module.exports = Object.assign({}, {connect})

