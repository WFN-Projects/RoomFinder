import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BarChart from "./BarChart";
// import DataGrid from "@material-ui/core/grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
// import Button from "@mui/material/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Floor_Layout = ({ buildingName, floor }) => {
  const [rooms, setRooms] = useState({});
  const [clicked, setClicked] = useState(false);
  const [clickedRoomNumber, setClickedRoomNumber] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = (roomNumber) => {
    setOpen(true);
    setClickedRoomNumber(roomNumber); // set the room number to a state variable
  };
  const handleClose = () => setOpen(false);

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setClicked(true);
            handleOpen(params.row.roomNumber);
          }}
        >
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
      {clicked ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ width: "45%" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <BarChart roomNumber={clickedRoomNumber}></BarChart>
            </Typography>
          </Box>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Floor_Layout;
