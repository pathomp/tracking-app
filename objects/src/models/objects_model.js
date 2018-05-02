const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectSchema = new Schema({
    name: String,
    IMEI: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Object", ObjectSchema);