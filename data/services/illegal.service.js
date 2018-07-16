const axios = require('axios')

module.exports = (datum) => {
    axios.put(`http://192.168.99.100:3004/illegals/OverSpeed`,datum)
        .then(function(response){
            return response.data
        })
        .catch(function(error){
            return error
        });
}