const express = require('express')
const app = express()
app.use(express.json())
const port = 3001

const database = require('./database')

//Add headers to allow requests from React

app.get('/roomAvail', (req, res) => {
    //const time = req.body.time; //is this necessary?
    const building = req.body.building;
    const floor = req.body.floor;
    database.roomAvail(building, floor)
    .then(response => {
        console.log(response);
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
    //res.send(JSON.stringify(response));
})

app.post('/updateRoom', (req, res) => {
    const building = req.body.building;
    const floor = req.body.floor;
    const room = req.body.room;
    const status = req.body.status;
    database.updateRoom(building, floor, room, status)
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
