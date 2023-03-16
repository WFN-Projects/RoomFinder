import React, { useState } from "react";
import "./CSS/BuildingLayout.css";
import { useParams } from "react-router-dom";

function BuildingLayout({ building }) {
  const { name } = useParams();
  const formattedName = name.replace("_", " ");
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

  // let marginTop = 0;
  const floorsPerBuilding = numberOfFloors[name];

  for (let i = 0; i < floorsPerBuilding; i++) {
    floorList.push(".");
  }

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
    <div className="background-Col">
      <div>
        <h1 className="building-Name">{formattedName}</h1>
        <ul className="building" style={{ listStyle: "none" }}>
          {floorList.map((floor, i) => (
            <button>
              <li key={i} style={{ marginBottom: "100px" }}>
                <div
                  style={{
                    top: `${i * 80}px`,
                    background: `linear-gradient(to bottom, ${
                      colourArray[i % colourArray.length]
                    }, #FFFFFF)`,
                    position: "absolute",
                    width: 455.31,
                    height: 261.78,
                    left: 141.43,
                    marginTop: 50,
                    backgroundColor: "#c7acff",
                    bottom: 50,
                    borderRadius: 28,
                    transform: "matrix(0.88, -0.47, 0.88, 0.47, 0, 0)",
                    marginBottom: 100 /* adjust the value as needed */,
                  }}
                ></div>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BuildingLayout;
