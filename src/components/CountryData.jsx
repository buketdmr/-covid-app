import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

import { useParams } from "react-router";
import countryInfo from "../country.json";
import { tsConstructorType } from "@babel/types";

const options = {
  title: {
    display: true,
    text: "Number of cases"
  },
  legend: {
    display: true,
    position: "right"
  }
};

export const CountryData = () => {
  {
    const [chartData, setChartData] = useState({});
    let { id } = useParams();

    const chart = () => {
      let dateList = [];
      let infectedNums = [];
      axios
        .get("http://localhost:5000/covidData/country", {
          params: { id }
        })
        .then(res => {
          for (const dataObj of res.data) {
            if (
              dataObj.lastUpdatedAtApify !== undefined &&
              dataObj.infected > 0
            ) {
              var asd = dataObj.lastUpdatedAtApify.substring(0, 10);
              if (dateList[dateList.length - 1] !== asd) {
                dateList.push(asd);
                infectedNums.push(parseInt(dataObj.infected));
              }
            }
          }
          setChartData({
            labels: dateList,
            datasets: [
              {
                label: "# of total cases",
                data: infectedNums,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderWidth: 4
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
      console.log(dateList, infectedNums);
    };

    useEffect(() => {
      chart();
    }, []);

    return (
      <div>
        <h2>Historical Covid Data for {countryInfo[id].name}</h2>
        <Line data={chartData} options={options} />
        <br />
        <p>
          Please wait, source Api ( {countryInfo[id].dataSource} ) is a bit
          SLOW!!!{" "}
        </p>
      </div>
    );
  }
};
