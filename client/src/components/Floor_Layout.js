import React, { useState, useEffect } from "react";
import DataGrid from "@mui/material/DataGrids";

export const Floor_Layout = ({ buildingName, floor, numFloors }) => {
  const [rooms, setRooms] = useState({});

  const getFloorAvailability = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/roomAvail?building=${buildingName}&floor=${floor}`
      );

      console.log(response);

      if (response.ok) {
        const jsonData = await response.json();
        setRooms(jsonData);
      } else {
        console.log(`Server returned status code ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFloorAvailability();
  }, [rooms]);

  const columns = [
    {
      field: "roomNumber",
      headerName: "Room Number",
      flex: 1,
    },
    {
      field: "availability",
      headerName: "Availability",
      flex: 1,
    },
  ];

  const rows = Object.keys(rooms).map((roomNumber) => ({
    id: roomNumber,
    roomNumber,
    availability: rooms[roomNumber],
  }));

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </>
  );
};
