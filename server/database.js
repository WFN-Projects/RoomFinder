const client = require("./client");
const mysql = require("mysql");

const roomAvail = async (building, floor) => {
  const response = await client.query(
    "SELECT * FROM roomavail WHERE Building_name = " +
      mysql.escape(building) +
      " AND Floor_Number = " +
      mysql.escape(floor)
  );
  const rooms = new Map();

  response.rows.forEach(function (row) {
    if (!rooms.has(row.room_number)) {
      rooms.set(row.room_number, [row.availability, row.date]);
    } else {
      let curr = new Date(row.date);
      let in_map = new Date(rooms.get(row.room_number)[1]);
      if (curr > in_map) {
        rooms.set(row.room_number, [row.availability, row.date]);
      }
    }
  });
  return rooms;
};

const updateRoom = async (building, floor, room, status) => {
  await client.query(
    "INSERT INTO roomavail (Date, Building_Name, Floor_Number, Room_Number, Availability) VALUES (now()," +
      mysql.escape(building) +
      ", " +
      mysql.escape(floor) +
      ", " +
      mysql.escape(room) +
      ", " +
      mysql.escape(status) +
      ")"
  );
};

const occupancyProbability = async (room) => {
  const response = await client.query(
    "SELECT * FROM roomavail WHERE room_number= " +
      mysql.escape(room) +
      " AND date BETWEEN NOW() - interval '2 WEEKS' AND NOW() ORDER BY date ASC"
  );

  const hourlyProbability = new Map();
  hourlyProbability.set(0, 0);
  for (let i = 1; i < 24; i++) {
    hourlyProbability.set(i, 0);
  }
  let fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 14);

  let matrix = [];
  for (let i = 0; i < 14; i++) {
    let hoursArray = []; //create an array per hour
    for (let j = 0; j < 24; j++) {
      hoursArray[j] = 0;
    }
    matrix[i] = hoursArray;
  }

  //let today = new Date();
  let fromHour = fromDate.getHours();

  console.log(response.rows);
  response.rows.forEach((row) => {
    const date = new Date(row.date);
    console.log("Checking if reached here");
    let hour = date.getHours();

    //use fromDate as base, matrix[0][0] is the fromDate, fromHour
    let dayDiff = Math.trunc((date - fromDate) / (24 * 60 * 60 * 1000)); //because interval is 24 x 14 hours, data does not start at 0am all the time
    let hourDiff = hour - fromHour;
    if (hourDiff < 0) {
      hourDiff = hourDiff + 24; //mod by 24
    }

    if (row.availability == false) {
      matrix[dayDiff][hourDiff] = 1;
    } else {
      // available
      date.setMilliseconds(date.getMilliseconds() - 1); //:00 edge case, ensure that it wont mark the next hour as false when e.g. 6:00
      let rowIndex = dayDiff;
      let colIndex = date.getHours() - fromHour;

      if (colIndex < 0) {
        colIndex = colIndex + 24;
      }
      //loop through matrix backwards to find the previous 1 (occupied)

      while (rowIndex >= 0 && matrix[rowIndex][colIndex] == 0) {
        //set all previous times that are not visibly updated to unavailable (which is the current status)
        matrix[rowIndex][colIndex] = 1;
        colIndex--;
        if (colIndex < 0) {
          colIndex = 23;
          rowIndex--;
        }
      }
    }
  });

  console.log("Did we make it here?");

  //processing the first row that the cut off is in the middle of being occupied
  if (response.rows[0].availability == true) {
    let date = new Date(response.rows[0].date);
    date.setMilliseconds(date.getMilliseconds() - 1);
    let dayDiff = Math.trunc((date - fromDate) / (24 * 60 * 60 * 1000));
    let hourDiff = date.getHours() - fromHour;
    if (hourDiff < 0) hourDiff = hourDiff + 24;

    let rowIndex = dayDiff; //current row
    let colIndex = hourDiff; //current col
    for (let j = colIndex; j >= 0; j--) {
      matrix[rowIndex][j] = 1;
    }
    for (let i = rowIndex - 1; i >= 0; i--) {
      for (let j = 0; j < 24; j++) {
        matrix[i][j] = 1;
      }
    }
  }

  //processing the last record if availability hasn't been set to true yet
  if (response.rows[response.rows.length - 1].availability == false) {
    //if last entry is false
    let date = new Date(response.rows[response.rows.length - 1].date);
    let dayDiff = Math.trunc((date - fromDate) / (24 * 60 * 60 * 1000));

    let hourDiff = date.getHours() - fromHour;
    if (hourDiff < 0) hourDiff = hourDiff + 24;

    //everything before is 0... set to 1, until matrix[13][23]
    let rowIndex = dayDiff; //current row
    let colIndex = hourDiff; //current col

    for (let j = colIndex; j < 24; j++) {
      matrix[rowIndex][j] = 1;
    }
    for (let i = rowIndex + 1; i < 14; i++) {
      for (let j = 0; j < 24; j++) {
        matrix[i][j] = 1;
      }
    }
  }

  //populate map, 0 is the fromHour
  for (let j = 0; j < 24; j++) {
    let count = 0;

    for (let i = 0; i < 14; i++) {
      count = count + matrix[i][j];
    }
    // console.log("count: ", count, "j: ", j);
    //convert column to real hour, add hourDiff back
    let hour = j + fromHour;
    if (hour >= 24) {
      hour = hour - 24;
    }
    hourlyProbability.set(hour, 1 - count / 14);
  }

  console.log(
    "Do we make it here? what is hourlyProbability: ",
    hourlyProbability
  );

  return hourlyProbability;
};

module.exports = {
  roomAvail,
  updateRoom,
  occupancyProbability,
};
