const axios = require('axios')

module.exports = (imei,datum) => {
    console.log(imei)
    axios.put(`http://10.195.2.163:3002/objects/updateData/${imei}`,datum)
        .then(function(response){
            return response.data
        })
        .catch(function(error){
            return error
        });
}