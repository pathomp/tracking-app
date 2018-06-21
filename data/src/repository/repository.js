'use strict'

const repository = (connection) => {

    const {db, ObjectID} = connection
    const collection = db.collection('data')

    const makeData = (data) => {
        return new Promise((resolve, reject) => {
            const currentDay = new Date()
            const payload = {
                geometry: {
                    type: "Point",
                    coordinates: data.geometry.coordinates
                },
                ts: currentDay.toISOString(),
                speed: data.speed,
                IMEI: data.IMEI
            }
            collection.insertOne(payload, (err, data) => {
                if (err) {
                    reject(new Error('An error occured fetching all data, err:' + err))
                }
                resolve(payload)
            })
        })
    } 

    const getDataByIMEI = (IMEI) => {
        return new Promise((resolve, reject) => {
            const data = []
            const cursor = collection.find({IMEI:IMEI})
            const addDatum = (datum) => {
                data.push(datum)
            }
            const sendData = (err) => {
              if (err) {
                reject(new Error('An error occured fetching all objects, err:' + err))
              }
              resolve(data.slice())
            }
            cursor.forEach(addDatum, sendData)
        })
    }

    const disconnect = () => (
        db.close()
    )

    return Object.create({
        makeData,
        getDataByIMEI,
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