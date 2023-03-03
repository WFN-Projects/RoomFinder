const client = require("./client")
const mysql = require('mysql')


const roomAvail = async (building, floor) => {
  const response = await client.query("SELECT * FROM roomavail WHERE Building_name = " + mysql.escape(building) + " AND Floor_Number = " + mysql.escape(floor));
  const rooms = new Map();

  response.rows.forEach(function (row) {
    if (!rooms.has(row.room_number)) {
      rooms.set(row.room_number, [row.availability, row.date]);
    } else {
      let curr = new Date(row.date);
      let in_map = new Date(rooms.get(row.room_number)[1])
      if (curr > in_map) {
        rooms.set(row.room_number, [row.availability, row.date]);
      }
    }
  })
  return rooms;
}

const updateRoom = async (building, floor, room, status) => {
  await client.query("INSERT INTO roomavail (Date, Building_Name, Floor_Number, Room_Number, Availability) VALUES (now()," + mysql.escape(building) + ', ' + mysql.escape(floor) + ', ' + mysql.escape(room) + ', ' + mysql.escape(status) + ')');
}

module.exports = {
  roomAvail,
  updateRoom
}