import React, { useState } from "react";
import "./CSS/BuildingLayout.css";
import { useParams } from "react-router-dom";
import FloorTile from "./FloorTile";
import Floor_Layout from "./Floor_Layout";

function BuildingLayout({ building }) {
  const { name } = useParams();

  const formattedName = name.replace("_", " ");
  const numberOfFloors = {
    Ontario_Hall: [
      "1e",
      "2e",
      "3e",
      "4e",
      "5e",
      "6e",
      "1w",
      "2w",
      "3w",
      "4w",
      "5w",
      "6w",
    ],
    Perth: [1, 2, 3, 4, 5, 6],
    Delaware: [1, 2, 3],
    Medsyd: [1, 2, 3],
    Essex: [1, 2, 3, 4, 5],
    Saugeen: [1, 2, 3, 4, 5, 6, 7],
    Alumni: [1, 2, 3, 4, 5, 6, 7],
    Elgin: [1, 2, 3, 4, 5, 6, 7],
    Lambton: [1, 2, 3, 4, 5, 6, 7],
    London_Hall: [1, 2, 3, 4, 5, 6, 7],
  };

  const floorList = numberOfFloors[name];

  return (
    <>
      <div className="background-Col">
        <div>
          <h1 className="building-Name">{formattedName}</h1>
          <ul className="building" style={{ listStyle: "none" }}>
            {floorList?.map((floor, i) => (
              <>
                <FloorTile
                  key={floor}
                  index={i}
                  buildingName={name}
                  floor={floor}
                ></FloorTile>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default BuildingLayout;
