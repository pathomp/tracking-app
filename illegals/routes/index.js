const Drivertime = require('../models/drivertime')
const moment = require('moment')

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

        let data = req.body || {}

        async function registDriver(data) {
            try {


                console.log(Drivertime)
                drivertime = Drivertime.create(data)
                res.send(201, "Regist succesfull")


            } catch (error) {
                res.send(500, "Server Error" + error)
            }

        }

        registDriver(data)
    })

    server.del('/illegal/DeleteDriver/:driver_lic', (req, res, next) => {

        let lic = req.params.driver_lic
        if(lic != ""){
        async function deleteDriver(lic) {
            let datum
            try {

                datum = await Drivertime.remove({ 'driver_lic': lic })
                console.log()
                res.send(201, "Delete " + lic + " succesfull")


            } catch (error) {
                res.send(500, "Server Error" + error)
            }

        }

        deleteDriver(lic)
        }else{
            res.send(500, "Please input Driver License")
        }
    })

    server.get('/illegal/CheckDriveTime/:driver_lic', (req, res, next) => {

        let lic = req.params.driver_lic

        async function checkTime(lic) {
            let datum

            try {

                datum = await Drivertime.findOne({ 'driver_lic': lic })
                const timenow = new Date().getTime()
                const timeget = new Date(datum.gps_time).getTime()

                this.state = {startDate:timeget, timeEnd:timenow}

                const startDate = moment(this.state.startDate)
                const timeEnd = moment(this.state.timeEnd)

                const diff = timeEnd.diff(startDate)
                const diffDuration = moment.duration(diff)

                if(diffDuration.asMinutes() >= 240){
                    res.send(201, "ขับเกิน 4 ชั่วโมง")
                }else if(diffDuration.asMinutes() >= 480){
                    res.send(201, "ขับเกิน 8 ชั่วโมง")
                }else{
                    res.send(201, "OK")
                }

            } catch (err) {
                console.error(err)
                res.send(500, { "message": err.message })
            }
        }

        checkTime(lic)
    })

    server.listen(3000, function () {
        console.log(`Server start`)
    })
}