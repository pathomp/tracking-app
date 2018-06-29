'use strict'

const repository = (connection) => {

    const {db, ObjectID} = connection
    //const collection = db.collection('illegal')

    const checkOverspeed = (speed) => {
        return new Promise((resolve, reject) => {
            console.log(speed)
            if(speed < 0)
            {
                reject(new Error('An error occured fetching all speed'))
            }

            if (speed > 80)
            {
                resolve(true)
            }else{
                resolve(false)
            }
        })
    } 

    const disconnect = () => (
        db.close()
    )

    return Object.create({
        checkOverspeed,
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