import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { BarChartV2 } from "./BarChartV2";
import "./CSS/Title.css";

function Title() {
  const residences = [
    {
      name: "Ontario Hall",
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
      name: "London Hall",
      image: "./images/London-Hall.png",
    },
    {
      name: "Delaware",
      image: "./images/Delaware.png",
    },
  ];

  return (
    <>
      <h1 className="title">Residences</h1>
      <Grid container>
        {residences.map((building) => (
          <>
            <Grid item xs={4} className="Grid-item">
              <Paper elevation={24}>
                <img src={building.image} alt={building.name}></img>
                <Link to={`/buildinglayout/${building.name}`}>
                  {building.name}
                </Link>
              </Paper>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}

export default Title;
