const dbSettings = {
    db: process.env.DB || 'tracking',
    user: process.env.DB_USER || 'pune',
    pass: process.env.DB_PASS || 'ABr4bEay',
    repl: process.env.DB_REPLS || 'rs1',
    servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
        '209.97.162.212:27017',
    ]
}

const jwtSetting = {
    secretKey: process.env.SESSIONKEY || 'cat 4 dog',
}

const serverSettings = {
    port: process.env.PORT || 3000,
    ssl: require('./ssl')
}

module.exports = Object.assign({}, { dbSettings, jwtSetting, serverSettings })