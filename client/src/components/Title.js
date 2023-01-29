import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "./CSS/Title.css";

function Title() {
  return (
    <>
      <h1>Residences</h1>
      <Grid container>
        <Grid item xs={3} className="Grid-item">
          <Paper elevation={24}>
            <Link to="/buildinglayout/ontario-hall">Ontario Hall</Link>
          </Paper>
        </Grid>
        <Grid item xs={3} className="Grid-item">
          <Paper elevation={24}>
            <Link to="/buildinglayout/perth">Perth</Link>
          </Paper>
        </Grid>
        <Grid item xs={3} className="Grid-item">
          <Paper elevation={24}>
            <Link to="/buildinglayout/med-syd">Medsyd</Link>
          </Paper>
        </Grid>
        <Grid item xs={3} className="Grid-item">
          <Paper elevation={24}>
            <Link to="/buildinglayout/essex">Essex</Link>
          </Paper>
        </Grid>
        <Grid item xs={3} className="Grid-item">
          <Paper elevation={24}>
            <Link to="/buildinglayout/saugeen">Saugeen</Link>
          </Paper>
        </Grid>
        <Grid item xs={3} className="Grid-item">
          <Paper elevation={24}>
            <Link to="/buildinglayout/london-hall">London Hall</Link>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Title;
