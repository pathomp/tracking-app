const errors = require('restify-errors');
const Data = require('../models/data')
const axios = require('axios')

module.exports = (server) => {


    server.get('/data', (req, res, next) => {
        res.send(200, "Hello")
    })

    server.get('/data/:imei', (req, res, next) => {
        if (!req.params.imei){
            res.send(400, {"message" : "Need imei to query data"})
        }

        let imei = req.params.imei

        async function findData(imei) {
            let datum
            try{
                datum = await Data.findOne({'imei':imei})
                res.send(201, datum)
            }catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        findData(imei)
    })

    server.post('/data/:imei', (req, res, next) => {
        if (!req.params.imei){
            res.send(400, {"message" : "Need imei to create data"})
        }

        let imei = req.params.imei
        let data = req.body || {}

        async function createData(data) {
            let datum
            let input_datum = {
                "geometry": {
                    "coordinates" : [
                        data.LON,
                        data.LAT
                    ]
                },
                "speed" : data.SPEED,
                "imei" : imei
            }
            try{
                datum = await Data.create(input_datum)
                const response = axios({
                    method: 'POST',
                    url: 'http://localhost:3001/illegal/Overspeed/',
                    data: datum
                });
                console.log(response.data)
                res.send(201, datum)
            }catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        createData(data)
    })
}