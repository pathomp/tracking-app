const express = require("express");
const Data = require("./models/datas_model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({ msg: "datas" });
});

app.get("/api/v1/datas", async (req, res) => {
  try{
    const datas = await Data.find({});
    res.json(datas);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/api/v1/datas", async (req, res) => {
  try{
    const data = new Data(req.body);
    const savedData = await data.save();
    res.json(savedData);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = app;
