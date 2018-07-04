const server = require('../server')
const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const request = supertest.agent(server)

const userCredentials = {
    email: 'punnone@gmail.com',
    password: 'abcd1234'
}

const authenService = supertest.agent('http://192.168.99.100:8080')

describe('API Tests', () => {

    let token = ""

    before(function(done){
        authenService
            .post('/auth/basic')
            .send(userCredentials)
            .end(function(err, res){
                token = res.body.access_token
                done()
            })
    })

    it('should get a valid token for user', (done) => {
        request.get('/data')
            .set('Content-Type','application/json')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err,res){
                expect(res.status).to.equal(200)
                done()
            })
    })
})