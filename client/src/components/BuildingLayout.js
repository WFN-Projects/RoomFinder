import React, { useState } from "react";
import "./CSS/BuildingLayout.css";
import { useParams } from "react-router-dom";

function BuildingLayout({ building }) {
  const { name } = useParams();
  const floorList = [];

  const numberOfFloors = {
    Ontario_Hall: 6,
    Perth: 6,
    Delaware: 5,
    Medsyd: 3,
    Essex: 5,
    Saugeen: 13,
    Alumni: 10,
    Elgin: 5,
    Lambton: 8,
    London_Hall: 6,
  };

  let marginTop = 0;
  const floorsPerBuilding = numberOfFloors[name];

  for (let i = 0; i < floorsPerBuilding; i++) {
    floorList.push(".")
  }

  const colourArray = ['#C7ACFF','#B18CFF','#A07EE7','#8C6CD0','#8266BF', '#6E55A4',
  '#5C4793','#4A3782', '#3B2D6E', '#2C235A','#1E1846','#110E32','#02061D'];

return (
  <ul className="building" style={{ listStyle: "none"}}>
    {floorList.map((floor, i) => (
      <li key={i}>
        <div
          className="floor"
          style={{
            top: `${i * 20}px`,
            background: `linear-gradient(to bottom, ${colourArray[i % colourArray.length]}, #FFFFFF)`,
          }}
        ></div>
      </li>
    ))}
  </ul>
);

}

export default BuildingLayout;
