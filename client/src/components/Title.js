import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Building from './Building';
import "./CSS/Title.css";

function Title() {
  const residences = [
    {
      name: "Ontario_Hall",
      image: "./images/Ontario-Hall.png",
    },
    {
      name: "Perth",
      image: "./images/Perth.png",
    },
    {
      name: "Medsyd",
      image: "./images/Medsyd.png",
    },
    {
      name: "Essex",
      image: "./images/Essex.png",
    },
    {
      name: "Saugeen",
      image: "./images/Saugeen.png",
    },
    {
      name: "London_Hall",
      image: "./images/London-Hall.png",
    },
    {
      name: "Delaware",
      image: "./images/Delaware.png",
    },
    {
      name: "Delaware",
      image: "./images/Delaware.png",
    },
    {
      name: "Delaware",
      image: "./images/Delaware.png",
    },
  ];

  return (
    <>
      <h1 className="title">Residences</h1>
      <Grid container  spacing={10}>
        {residences.map((building) => (
          <>
            <Grid item xs={4} className="Grid-item">
              <Paper elevation={2}>
                <Building curr_building={building}></Building>
              </Paper>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}

export default Title;
