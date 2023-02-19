import React from "react";
import { useState } from "react";

const FloorMap = () => {
  const [expandFloor, setExpand] = useState(false);
  const toggleExpand = () => setExpand((prevExpand) => !prevExpand);

  const buildingName = window.URL.href.match("([^/]+$)"[0]);

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

  const floorsPerBuilding = 3;

  const floorList = [];

  for (let i = 0; i < floorsPerBuilding; i++) {
    floorList.push(<div> hi</div>);
  }

  // TODO get number of floors for the current building

  return (
    <div className="FloorMap">
      <button onClick={toggleExpand}>
        FLOOR #1 +<span>{expand ? "-" : "+"}</span>{" "}
      </button>

      {expandFloor && <div>now you can be redirected to floormap</div>}
    </div>
  );
};

export default FloorMap;
