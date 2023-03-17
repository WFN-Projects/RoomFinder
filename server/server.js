const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const database = require("./database");

app.get("/", (req, res) => {
  console.log("stfu");
});

app.get("/roomAvail", (req, res) => {
  const building = req.body.building;
  const floor = req.body.floor;

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
  const building = req.body.building;
  const floor = req.body.floor;
  const room = req.body.room;
  const status = req.body.status;
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
  const room = req.body.room;
  console.log(room);
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
