import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";

import { Bar, Line } from "react-chartjs-2";
import axios from "axios";

const options = {
  title: {
    display: true,
    text: "Number of total cases"
  },
  legend: {
    display: true,
    position: "right"
  }
};

let countryList = [];
let activeCaseList = [];

export const Home = () => {
  {
    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeAge, setEmployeeAge] = useState([]);

    const chart = () => {
      let empSal = [];
      let empAge = [];
      axios
        .get("http://localhost:5000/covidData")
        .then(res => {
          console.log("fdhjfdf ", res.data);

          for (const dataObj of res.data) {
            // console.log("bukiim", dataObj);
            empSal.push(dataObj.country);
            empAge.push(parseInt(dataObj.infected));
          }
          setChartData({
            labels: empSal,
            datasets: [
              {
                label: "# of total cases",
                data: empAge,
                backgroundColor: poolColors(49),
                borderWidth: 4
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
      console.log(empSal, empAge);
    };

    function dynamicColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgba(" + r + "," + g + "," + b + ", 0.5)";
    }

    function poolColors(a) {
      var pool = [];
      for (let i = 0; i < a; i++) {
        pool.push(dynamicColors());
      }
      return pool;
    }
    useEffect(() => {
      chart();
    }, []);

    return (
      <div>
        <Link to="/dashboard">
          <h1>Country Based Total Covid-19 Cases</h1>
        </Link>
        <Bar data={chartData} options={options} />
        <br />
        <Container>
          <Row>
            <Col md="auto">
              {" "}
              <h4>To see country specific data </h4>
            </Col>
            <Col md="auto">
              {" "}
              <DropdownButton
                label="dffgf"
                id="dropdown-basic-button"
                title="Select Country"
              >
                <Dropdown.Item>
                  <Link to="/country/uk">United Kingdom</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/country/tr">Turkey</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/country/hr">Croatia</Link>
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};
