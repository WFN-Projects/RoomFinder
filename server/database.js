const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const floorAvail = (time, building, floor) => {
  return new Promise(function(resolve, reject) {
    const {time, building, floor} = body;
    pool.query("SELECT Availablility FROM Data WHERE Building_Name = '' AND Floor_Number = `${floor}) ")
  })
}

const updateRoom = (time, building, floor, room, status) => {
  return new Promise(function(resolve, reject) {
    const {time, building, floor, room, status} = body;
    pool.query('UPDATE Room_Number (time, building, floor, room) VALUES (status) RETURNING *', [time, building, floor, room, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve("The room has been updated")
    })
  })
}

module.exports = {
  floorAvail,
  updateRoom
}