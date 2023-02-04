const express = require('express')
const app = express()
app.use(express.json())
const port = 3001

const database = require('./database')

//Add headers to allow requests from React

app.get('/floorAvail', (req, res) => {
    const time = req.body.time;
    const building = req.body.building;
    const floor = req.body.floor;
    const availRooms = [];
    database.floorAvail(time, building, floor)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
    //res.send(JSON.stringify(availRooms));
})

app.post('/updateRoom', (req, res) => {
    const time = req.body.time;
    const building = req.body.building;
    const floor = req.body.floor;
    const room = req.body.room;
    const status = req.body.status;
    database.updateRoom(time, building, floor, room, status)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
