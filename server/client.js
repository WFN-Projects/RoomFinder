var pg = require('pg');
require('dotenv').config();
var mysql = require('mysql');
var db_connection_stirng = process.env.DATABASE_URL;
var client = new pg.Client(db_connection_stirng);

(async () => {
    await client.connect();
    
    /*const building = "ohall";
    const floor = "2e";
    const query = "SELECT Availability FROM roomavail WHERE Building_Name = " + mysql.escape(building) + "AND Floor_Number = " + mysql.escape(floor);
    const response = await client.query(query);
    const availRooms = [];
    for (var i=0; i<response.rows.length; i++) {
      availRooms.push(response.rows[i].availability);
    }
    console.log(availRooms);*/
  })();

module.exports = client;