const request = require('supertest')

module.exports = (speed) => {
    return new Promise((resolve, reject) => {
        request('http://192.168.99.100:8080')
            .get('/illegals/checkOverspeed/' + speed)
            .end((err, res) => {
                if (err) {
                    reject(new Error('An error occured with the illegal service, err: ' + err))
                }
                resolve(res)
            })
    })
}