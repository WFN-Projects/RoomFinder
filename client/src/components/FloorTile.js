import React, { useState } from "react";
import Floor_Layout from "./Floor_Layout";
import "./CSS/BuildingLayout.css";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const FloorTile = ({ index, buildingName, floor }) => {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const colourArray = [
    "#C7ACFF",
    "#B18CFF",
    "#A07EE7",
    "#8C6CD0",
    "#8266BF",
    "#6E55A4",
    "#5C4793",
    "#4A3782",
    "#3B2D6E",
    "#2C235A",
    "#1E1846",
    "#110E32",
    "#02061D",
  ];

  return (
    <>
      <div key={index} style={{ marginBottom: "100px" }}>
        <div
          onClick={() => {
            setClicked(true);
            handleOpen();
          }}
          style={{
            top: `${index * 80}px`,
            background: `linear-gradient(to bottom, ${
              colourArray[index % colourArray.length]
            }, #FFFFFF)`,
            position: "absolute",
            width: 455.31,
            height: 261.78,
            left: 141.43,
            marginTop: 50,
            bottom: 50,
            borderRadius: 28,
            transform: "matrix(0.88, -0.47, 0.88, 0.47, 0, 0)",
            marginBottom: 100 /* adjust the value as needed */,
          }}
        >
          <h1 style={{ fontSize: "50px" }}>{floor}</h1>
        </div>
      </div>
      {clicked ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ width: "45%" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Floor_Layout
                buildingName={buildingName}
                floor={floor}
              ></Floor_Layout>
            </Typography>
          </Box>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default FloorTile;
