import React from "react";
import { BrowserRouter as Render, Route, Link } from "react-router-dom";
import { OtherPage } from "./OtherPage";
import { HomePage } from "./HomePage";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Render>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Home</Link>
          <Link to="/otherPage">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/otherPage" component={OtherPage}></Route>
        </div>
      </div>
    </Render>
  );
}

export default App;
