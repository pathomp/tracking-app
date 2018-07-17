const errors = require('restify-errors');
const Data = require('../models/data')
const services = require('../services')

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
                datum = await Data.find({'imei':imei})
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
            let datum, illegals, object
            let input_datum = {
                "geometry": {
                    "coordinates" : [
                        data.LON,
                        data.LAT
                    ]
                },
                "GPS_TIME" : data.GPS_TIME,
                "VENDOR_TIME" : data.VENDOR_TIME,
                "SPEED" : data.SPEED,
                "IMEI" : data.IMEI,
                "VENDOR_ID" : data.VENDOR_ID,
                "ENGINE_STAT" : data.ENGINE_STAT,
                "HEADING" : data.HEADING,
                "SAT_NO" : data.SAT_NO,
                "RSSI" : data.RSSI
            }
            try{
                datum = await Data.create(input_datum)
                // illegals = await services.illegalsService(datum)
                object = await services.objectsService(imei,datum)
                res.send(201, datum)
            }catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        createData(data)
    })
}