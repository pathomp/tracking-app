const request = require('supertest')

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        // request('http://192.168.99.100:3001')
        //     .post('/users/login')
        //     .send({data})
        //     .end((err, res) => {
        //         if (err) {
        //             reject(new Error('An error occured with the objects service, err: ' + err))
        //         }
        //     })
    })
}