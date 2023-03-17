import React from 'react';
import { Link } from "react-router-dom";


const Building = ({ curr_building }) => {
  return (
    <div>
      <center>   
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