const client = require("./client")

/*const floorAvail = (time, building, floor) => {
  return new Promise(function(resolve, reject) {
    //const {time, building, floor} = body;
    client.query("SELECT Availability FROM roomavail WHERE Building_name = " + mysql.escape(building) + " AND Floor_Number = " + mysql.escape(floor)), (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    };
  })
}*/

const roomAvail = async (building, floor) => {
  const response = await client.query("SELECT Availability FROM roomavail WHERE Building_name = " + mysql.escape(building) + " AND Floor_Number = " + mysql.escape(floor));
  const availRooms = [];
  for (var i=0; i<response.rows.length; i++) {
    availRooms.push(response.rows[i].availability);
  }
  return availRooms;
}

const updateRoom = async (building, floor, room, status) => {
  await client.query("INSERT INTO roomavail (Date, Building_Name, Floor_Number, Room_Number, Availability) VALUES (now()," + mysql.escape(building) + ', ' + mysql.escape(floor) + ', ' + mysql.escape(room) + ', ' + mysql.escape(status) + ')');
}

module.exports = {
  roomAvail,
  updateRoom
}