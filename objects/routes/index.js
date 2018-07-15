const errors = require('restify-errors');
const Object = require('../models/object')

module.exports = (server) => {

    server.get('/objects', (req, res, next) => {
        async function getAllObject() {
            let data
            try{
                data = await Object.find({})
                res.send(201, data)
            }catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        getAllObject()
    })

    server.get('/objects/:imei', (req, res, next) => {
        if (!req.params.imei){
            res.send(400, {"message" : "Need imei to query object"})
        }

        let imei = req.params.imei

        async function findObject(imei) {
            let datum
            try{
                datum = await Object.findOne({'imei':imei})
                res.send(201, datum)
            }catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        findObject(imei)
    })

    server.post('/objects', (req, res, next) => {

        let data = req.body || {}

        async function createObject(data) {
            let object
            try{
                object = await Object.create(data)
                res.send(201, object)
            }catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        createObject(data)

    })

    server.put('/objects/updateData/:imei', (req, res, next) => {

        if (!req.params.imei){
            res.send(400, {"message" : "Need imei to update data"})
        }

        let imei = req.params.imei
        let data = req.body || {}

        async function updateObjectData(data) {
            let object
            try{
                object = await Object.findOne({'imei':imei})
                if(!object) return res.send(403, {"message": "Object not found"})
                object.object_data = {
                    geometry: {
                        type: 'Point',
                        coordinates: data.geometry.coordinates
                    },
                    ts: data.ts,
                    speed: data.speed
                }
                object.markModified('object_data')
                object = await object.save();
                res.send(201, object)
            }catch(err) {
                console.error(err)
                res.send(500, {"message" : err.message})
            }
        }

        updateObjectData(data)
    })
}