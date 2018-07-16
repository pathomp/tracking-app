const Drivertime = require('../models/drivertime')
const Overspeed = require('../models/overspeed')
const Illegals = require('../models/illegals')

const moment = require('moment')

module.exports = (server) => {

    server.get('/illegals/test', (req, res, next) => {
        res.send(201, "OK")
    })

    server.post('/illegals/OverSpeed', (req, res, next) => {

        let overspeed
        let type = 1
        let data = req.body || {}

        console.log(data.ts.substring(0,data.ts.length-1))

        async function registOverspeed(data) {
            let datum
            let alarmcheck
            try {

                if (data.speed > 60) {
                    overspeed = 1
                }else {
                    overspeed = 0
                }

                if (overspeed == 1) {

                    datum = await Overspeed.findOne({ imei: data.imei })
                    if (!datum) {
                        await Overspeed.create({ imei: data.imei, start_time: data.ts.substring(0,data.ts.length-1), type:type, speed: data.speed })
                        res.send(201, "Register new Overspeed")
                    } else {

                        const timenow = new Date(data.ts.substring(0,data.ts.length-1)).getTime()
                        const timeget = new Date(datum.start_time).getTime()

                        this.state = { startDate: timeget, timeEnd: timenow }

                        const startDate = moment(this.state.startDate)
                        const timeEnd = moment(this.state.timeEnd)

                        const diff = timeEnd.diff(startDate)
                        const diffDuration = moment.duration(diff)

                        if (diffDuration.asMinutes() >= 2) {

                            alarmcheck = await Illegals.findOne({ imei: data.imei, status: "On" })
                            if (!alarmcheck) {
                                await Illegals.create({ imei: data.imei, time: data.ts.substring(0,data.ts.length-1), illegals_name: "Overspeed", status: "On" })
                                res.send(201, "Alarm of " + datum.imei + " is On")
                            } else {
                                res.send(201, "Alarm of this car is On")
                            }

                        } else if (diffDuration.asMinutes() < 2 && diffDuration.asMinutes() >= 0) {

                            res.send(201, datum.imei + " Update Overspeed")

                        } else {
                            await Overspeed.findOneAndUpdate({ imei: data.imei }, { start_time: data.ts.substring(0,data.ts.length-1) })
                            res.send(201, " Update Overspeed")

                        }

                        res.send(201, diffDuration.asMinutes())
                    }
                } else {
                    await Illegals.findOneAndUpdate({ imei: data.imei, illegals_name: "Overspeed" }, { status: "Closed" })
                    await Overspeed.remove({ 'imei': data.imei })
                    res.send(201, "Ok")
                }


            } catch (error) {
                res.send(500, "Server Error" + error)
            }
        }
        registOverspeed(data)
    })


    server.post('/illegals/RegistDrive', (req, res, next) => {

        let data = req.body || {}

        async function registDriver(data) {
            let datum
            try {

                datum = await Drivertime.findOne({ driver_lic: data.driver_lic })
                
                if (!datum) {

                    await Drivertime.create({ driver_lic: data.driver_lic, start_time: moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS'), stop_time: "", work_time: "0", rest_time: "0", status: "Working" })
                    res.send(201, "Regist succesfull")
                } else {
                    
                    if (datum.status == "Not Working") {
                        
                        await Drivertime.findOneAndUpdate({ driver_lic: data.driver_lic }, { start_time: moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS'), stop_time: "", status: "Working" })
                        res.send(201, data.driver_lic + " Start working")
                    } else {

                        await Drivertime.findOneAndUpdate({ driver_lic: data.driver_lic }, { stop_time: moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS'), status: "Not Working" })
                        res.send(201, data.driver_lic + " Take a break")
                    }
                }

            } catch (error) {
                res.send(500, "Server Error" + error)
            }

        }

        registDriver(data)
    })

    server.get('/illegals/CheckDriveTime/:driver_lic', (req, res, next) => {

        let lic = req.params.driver_lic

        async function checkTime(lic) {
            let datum

            try {

                datum = await Drivertime.findOne({ 'driver_lic': lic , status : "Working"})
                if(datum){
                const timenow = new Date().getTime()
                const timeget = new Date(datum.start_time).getTime()

                this.state = { startDate: timeget, timeEnd: timenow }

                const startDate = moment(this.state.startDate)
                const timeEnd = moment(this.state.timeEnd)

                const diff = timeEnd.diff(startDate)
                const diffDuration = moment.duration(diff)

                   

                await Drivertime.findOneAndUpdate({'driver_lic' : lic, status: "Working"},{work_time : diffDuration.asMinutes()})

                if (diffDuration.asMinutes() >= 240) {

                    res.send(201, "ขับเกิน 4 ชั่วโมง")
                } else if (diffDuration.asMinutes() >= 480) {

                    res.send(201, "ขับเกิน 8 ชั่วโมง")
                } else {

                    res.send(201, "OK")
                }
            }else{
                res.send(201, "This driver is not working")
            }

            } catch (err) {
                console.error(err)
                res.send(500, { "message": err.message })
            }
        }

        checkTime(lic)
    })
}