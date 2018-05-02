const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    ts: { type: Date, default: Date.now },
    type: String,
    value: Number,
    geometry:{
        type: { type: String,default: 'Point'},
        coordinates: { 
            type: [Number], 
            index: '2dsphere',
            require: true,
        }
    },
    IMEI: String
    // object: { type: Schema.Types.ObjectId, ref: "Object"}
});


module.exports = mongoose.model("Data", DataSchema);