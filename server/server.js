const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;
const bodyParser = require("body-parser");
let roomAvail = true;
const cors = require("cors");
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const database = require("./database");

app.get("/roomAvail", (req, res) => {
  const { building, floor } = req.query;

  database
    .roomAvail(building, floor)
    .then((response) => {
      const obj = Object.fromEntries(response);
      res.status(200).send(JSON.stringify(obj));
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/updateRoom", (req, res) => {
  roomAvail = !roomAvail;
  const building = req.body.building;
  const floor = req.body.floor;
  const room = req.body.room;
  const status = roomAvail;
  console.log(building, floor, room, status);
  database
    .updateRoom(building, floor, room, status)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/occupancyProbability", (req, res) => {
  const { room } = req.query;
  database
    .occupancyProbability(room)
    .then((response) => {
      const obj = Object.fromEntries(response);
      res.status(200).send(JSON.stringify(obj));
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
