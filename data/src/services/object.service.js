const request = require('supertest')

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        request('http://192.168.99.100:8080')
            .post('/objects/updateObjectData')
            .send({data})
            .end((err, res) => {
                if (err) {
                    reject(new Error('An error occured with the objects service, err: ' + err))
                }
            })
    })
}