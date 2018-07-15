
module.exports = {
    name: 'Data',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    serverSettings: {
        port: process.env.PORT || 3000
    },
    dbSettings: {
        db: process.env.DB || 'tracking',
        server: process.env.DB_SERVER || '209.97.162.212:27017',
        get url (){
            return `mongodb://${this.server}/${this.db}`
        }
    },
    tokenSettings: {
        privateKey: process.env.TOKEN_KEY || 'cat4dog'
    }
}