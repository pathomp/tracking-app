const Drivertime = require('../models/drivertime')

module.exports = (server) => {

server.post('/illegal/checkSpeed/', (req, res, next) => {
    try {
        const data = req.body
        if (data.engine == 1) {

            if (data.type == 1) {

                if (data.speed > 80) {
                    res.send(200, "Overspeed Truck")
                } else {
                    res.send(200, "Not Overspeed")
                }
            } else if (data.type == 2) {

                if (data.speed > 60) {
                    res.send(200, "Overspeed Semi-Truck")
                } else {
                    res.send(200, "Not Overspeed")
                }
            }
        } else {
            res.send(200, "Engine not Started")
        }

    } catch (error) {
        res.send(500, "Server Error")
    }

})

server.post('/illegal/RegistDrive/', (req, res, next) => {

    try {
        let drivertime
        let data = req.body || {}
        console.log(Drivertime)
        drivertime = Drivertime.create(data)
        res.send(201, {"gps_time" : data.gps_time, "driver_lic" : data.driver_lic})


    } catch (error) {
        res.send(500, "Server Error" + error)
    }
})



server.post('/illegal/CheckDriveTime/', (req, res, next) => {

    let dri

    let data = req.body || {}
    
    try {
        console.log(Drivertime)
        dri = Drivertime.findOne({ driver_lic : data.driver_lic })
        console.log(dri.gps_time)
        res.send(200, "YEAH")

    } catch (error) {
        res.send(500, "Server Error" + error)
    }
})

server.listen(3000, function () {
    console.log(`Server start`)
})
}