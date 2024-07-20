import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Dates", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Dates", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      
      setData(dataCopy);
    }
  }, [historicalData]);

  console.log(data);

  return <div>
    <Chart
        chartType = 'LineChart'
        data={data}
        height="100%"
        legendToggle       
    />
  </div>;
};

export default LineChart;
