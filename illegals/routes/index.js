const Drivertime = require('../models/drivertime')
const Overspeed = require('../models/overspeed')
const Illegals = require('../models/illegals')

const moment = require('moment')

module.exports = (server) => {

    server.post('/illegal/OverSpeed/', (req, res, next) => {
        let overspeed

        let data = req.body || {}

        async function registOverspeed(data) {
            let datum
            let alarmcheck
            try {

                if (data.type == 1 && data.speed > 60) {
                    overspeed = 1
                } else if (data.type == 2 && data.speed > 80) {
                    overspeed = 1
                } else {
                    overspeed = 0
                }

                if (overspeed == 1) {

                    datum = await Overspeed.findOne({ gps_id: data.gps_id })
                    if (!datum) {
                        await Overspeed.create(data)
                        res.send(201, "Register new Overspeed")
                    } else {


                        const timenow = new Date(data.gps_time).getTime()
                        const timeget = new Date(datum.gps_time).getTime()

                        this.state = { startDate: timeget, timeEnd: timenow }

                        const startDate = moment(this.state.startDate)
                        const timeEnd = moment(this.state.timeEnd)

                        const diff = timeEnd.diff(startDate)
                        const diffDuration = moment.duration(diff)

                        if (diffDuration.asMinutes() >= 2) {

                            alarmcheck = await Illegals.findOne({ license: data.gps_id, status: "On" })
                            if (!alarmcheck) {
                                await Illegals.create({ license: data.gps_id, driver_lic: data.driver_lic,type : data.type, time: data.gps_time, illegals_name: "Overspeed", status: "On" })
                                res.send(201, "Alarm of " + datum.gps_id +  + " is On")
                            } else {
                                res.send(201, "Alarm of this car is On")
                            }

                        } else if (diffDuration.asMinutes() < 2 && diffDuration.asMinutes() > 0) {

                            res.send(201, datum.gps_id + " Update Overspeed")

                        } else {

                            res.send(201, "Error")

                        }

                        res.send(201, diffDuration.asMinutes())
                    }
                } else {
                    await Illegals.findOneAndUpdate({license : data.gps_id},{status : "Closed"})
                    await Overspeed.remove({ 'gps_id': data.gps_id })
                    res.send(201, "Alarm of this car Closed")
                }


            } catch (error) {
                res.send(500, "Server Error" + error)
            }
        }
        registOverspeed(data)
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
        if (lic != "") {
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
        } else {
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

                this.state = { startDate: timeget, timeEnd: timenow }

                const startDate = moment(this.state.startDate)
                const timeEnd = moment(this.state.timeEnd)

                const diff = timeEnd.diff(startDate)
                const diffDuration = moment.duration(diff)

                if (diffDuration.asMinutes() >= 240) {
                    res.send(201, "ขับเกิน 4 ชั่วโมง")
                } else if (diffDuration.asMinutes() >= 480) {
                    res.send(201, "ขับเกิน 8 ชั่วโมง")
                } else {
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