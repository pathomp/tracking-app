'use strict'

const repository = (connection) => {

    const {db, ObjectID} = connection
    const collection = db.collection('objects')

    const getObjectById = (objectId) => {
        return new Promise((resolve, reject) => {
            const query = {_id: new ObjectID(objectId)}
            const sendObject = (err, object) => {
                if (err) {
                  reject(new Error(`An error occured fetching a object, err: ${err}`))
                }
                resolve(object)
            }
            collection.findOne(query,{},sendObject)
        })
    }

    const getAllObjects = () => {
        return new Promise((resolve, reject) => {
            const objects = []
            const cursor = collection.find({})
            const addObject = (object) => {
                objects.push(object)
            }
            const sendObjects = (err) => {
              if (err) {
                reject(new Error('An error occured fetching all objects, err:' + err))
              }
              resolve(objects.slice())
            }
            cursor.forEach(addObject, sendObjects)
        })
    }

    const updateObjectData = (data, object) => {
        return new Promise((resolve, reject) => {
            const query = { IMEI: data.IMEI }
            const payload = {
                object_data:{
                    geometry: {
                        type: "Point",
                        coordinates: data.geometry.coordinates
                    },
                    ts: data.ts,
                    speed: data.speed
                }
            }
            const set = { $set: payload }
            collection.findOneAndUpdate(query, set, (err, object) => {
                if (err) {
                    reject(new Error('An error occured fetching all objects, err:' + err))
                }
                resolve(object)
            })
        })
    } 

    const disconnect = () => (
        db.close()
    )

    return Object.create({
        getObjectById,
        getAllObjects,
        updateObjectData,
        disconnect
    })
}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if(!connection) {
            reject(new Error('connection db not supplied!'))
        }
        resolve(repository(connection))
    })
}

module.exports = Object.assign({}, {connect})