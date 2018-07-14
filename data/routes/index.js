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
<<<<<<< HEAD
            let input_datum = {
                "geometry": {
                    "coordinates": [
=======
            let datum
            let input_datum = {
                "geometry": {
                    "coordinates" : [
>>>>>>> 42f7df8f2585157d826535ef3e3c7de7d975fcb8
                        data.LON,
                        data.LAT
                    ]
                },
<<<<<<< HEAD
                "speed": data.SPEED,
                "imei": imei
            }
            try{
                datum = await Data.create(input_datum)
=======
                "speed" : data.SPEED,
                "imei" : imei
            }
            try{
                datum = await Data.create(input_datum)
                // const response = await axios({
                //     method: 'POST',
                //     url: 'http://localhost:3001/illegal/OverSpeed/',
                //     data: datum
                // });

>>>>>>> 42f7df8f2585157d826535ef3e3c7de7d975fcb8
                res.send(201, datum)
            }catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        createData(data)
    })
}