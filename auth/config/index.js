
module.exports = {
    name: 'Auth Service',
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
        privateKey: 'cat4dog',
        tokenExpiry: 60 * 60
    }
}