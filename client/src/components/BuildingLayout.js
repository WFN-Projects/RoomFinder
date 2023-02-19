import React from "react";

import { useParams } from "react-router-dom";
const listOfFloors = ["floor1", "floor2", "f3", "f4"];
function BuildingLayout({ building }) {
  const { name } = useParams();
  console.log(useParams());

  const numberOfFloors = {
    Ohall: 6,
    Delaware: 5,
    Perth: 6,
    Essex: 5,
    Medway: 3,
    Alumni: 10,
    Elgin: 5,
    Lambton: 8,
    Saugeen: 13,
  };

  const renderTiles = () => {
    const floorsPerBuilding = numberOfFloors[name];

    const floorList = [];

    for (let i = 0; i < floorsPerBuilding; i++) {
      floorList.push(<div className=""> hi</div>);
    }
    return floorList;
  };

  return <div> {renderTiles()}</div>;
}

export default BuildingLayout;
