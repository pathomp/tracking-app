const axios = require('axios')

module.exports = (imei,datum) => {
    console.log(imei)
    axios.put(`http://192.168.99.100:3002/objects/updateData/${imei}`,datum)
        .then(function(response){
            return response.data
        })
        .catch(function(error){
            return error
        });
}