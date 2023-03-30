import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
//import { hourProbability } from "../server/database.js";

const BarChart = ({ roomNumber }) => {
  // Create a new Map object with some sample data
  //const myMap = new Map();
  // myMap.set("0", 10);
  // myMap.set("1", 20);
  //myMap.set("2", 15);
  //console.log(hourProbability);
  const [map, setMap] = useState({});

  const getMap = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/occupancyProbability?room=${roomNumber}`
      );
      if (response.ok) {
        const jsonData = await response.json();
        setMap(jsonData);
        console.log(map);
      } else {
        console.log(`Server returned status code ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // // Extract the keys and values from the map into separate arrays
  // const labels = Array.from(hourProbability.keys());
  // const data = Array.from(hourProbability.values());

  // // Create a reference to the canvas element using the useRef hook
  // const canvasRef = useRef(null);

  // // Use the useEffect hook to create the chart after the component mounts
  // useEffect(() => {
  //   // Create a new Chart object with the canvas context
  //   const Chart = new Chart(canvasRef.current, {
  //     type: "bar",
  //     data: {
  //       labels: labels, // Set the x-axis labels to the keys in the map
  //       datasets: [
  //         {
  //           label: "My Dataset",
  //           data: data, // Set the y-axis data to the values in the map
  //           backgroundColor: "rgba(191, 85, 236, 0.5)",
  //           borderColor: "rgba(191, 85, 236, 1)",
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true, // Start the y-axis at zero
  //         },
  //       },
  //     },
  //   });

  //   // Return a cleanup function to destroy the chart when the component unmounts
  //   return () => {
  //     Chart.destroy();
  //   };
  // }, [data, labels]);

  return <div>{/* <canvas ref={canvasRef}></canvas> */}</div>;
};

export default BarChart;
