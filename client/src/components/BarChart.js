import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
// import { Bar } from "react-chartjs-2";

Chart.register({
  id: "myCustomScale",
  type: "linear",
  ticks: {
    min: 0,
    max: 100,
    stepSize: 20,
  },
});

const BarChart = ({ roomNumber }) => {
  const [map, setMap] = useState({});
  const [labels, setLabels] = useState({});
  const [data, setData] = useState({});

  // Create a reference to the canvas element using the useRef hook
  const canvasRef = useRef(null);

  const getMap = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/occupancyProbability?room=${roomNumber}`
      );
      if (response.ok) {
        const jsonData = await response.json();
        setMap(jsonData);
        return jsonData; // <-- Return an array of keys
      } else {
        console.log(`Server returned status code ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Use the useEffect hook to create the chart after the component mounts
  useEffect(() => {
    getMap().then((jsonData) => {
      // console.log(jsonData, Object.keys(jsonData), Object.values(jsonData));
      const keys = Object.keys(jsonData);
      const values = Object.values(jsonData);
      setLabels(keys);
      setData(values);
      console.log(keys, values);

      const ctx = canvasRef.current.getContext("2d");

      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: keys, // <-- Use the returned array
          datasets: [
            {
              label: "Occupancy Probability per Hour",
              data: values,
              backgroundColor: "grey",
              borderColor: "black",
              borderWidth: 0.5,
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                stepSize: 1, // <-- Set the step size of the x-axis ticks to 1
              },
            },
            y: {
              type: "linear",
              ticks: {
                min: 0,
                max: 100,
                stepSize: 20,
              },
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    });
  }, [roomNumber]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default BarChart;
