import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/data-grid";
// import DataGrid from "@material-ui/core/grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import BarChart from "./BarChart";

const Floor_Layout = ({ buildingName, floor }) => {
  const [rooms, setRooms] = useState({});

  const getFloorAvailability = async () => {
    if (buildingName === "Ontario_Hall") {
      buildingName = "ohall";
    }

    try {
      const response = await fetch(
        `http://localhost:3001/roomAvail?building=${buildingName}&floor=${floor}`
      );

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
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
  }, [floor]);

  const columns = [
    {
      feild: "viewProbability",
      headerName: "View Probability",
      flex: 1,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => {}}>
          View Probability
        </Button>
      ),
    },
    {
      field: "roomNumber",
      headerName: "Room Number",
      width: 150,
      flex: 1,
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 150,
      flex: 1,
    },
  ];

  const rows = Object.keys(rooms).map((roomNumber) => ({
    id: roomNumber,
    roomNumber: roomNumber,
    availability: rooms[roomNumber][0],
  }));

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default Floor_Layout;
