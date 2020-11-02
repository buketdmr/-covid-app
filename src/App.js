import logo from "./logo.svg";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { NoMatch } from "./components/NoMatch";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavigationBar";
import { CountryData } from "./components/CountryData";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/country/:id" component={CountryData} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </Router>
    </React.Fragment>
  );
}

export default App;
