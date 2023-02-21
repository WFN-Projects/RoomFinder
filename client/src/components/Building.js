import React from 'react';
import { Link } from "react-router-dom";
import ohall from './images/OHall.png'

const Building = ({ curr_building }) => {
  return (
    <div>
      <center> 
      <img href={`/buildinglayout/${curr_building.name}`} src={ohall} alt={curr_building.name} />   
      <h1>
        <Link to={`/buildinglayout/${curr_building.name}`}>
          {curr_building.name}
        </Link> 
      </h1>
      </center>
    </div>
  );
};

export default Building;