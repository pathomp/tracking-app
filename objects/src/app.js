const express = require("express");
const Object = require("./models/objects_model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({ msg: "objects" });
});

app.get("/api/v1/objects", async (req, res) => {
  try{
    const objects = await Object.find({});
    res.json(objects);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/api/v1/objects", async (req, res) => {
  try{
    const object = new Object(req.body);
    const savedObject = await object.save();
    res.json(savedObject);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = app;
