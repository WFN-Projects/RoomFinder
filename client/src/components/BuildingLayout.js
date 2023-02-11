import React from "react";


const listOfFloors = ["floor1", "floor2", "f3", "f4"];
function BuildingLayout({ building }) {

    return (
        <div className="BuildingLayout">
            {
                list.map((floor, index) => {
                    return <div classNamme="myDiv" key={index}> {floor}</div>
                })
            }
        </div>
    );

}

export default BuildingLayout;
