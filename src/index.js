import React from "react";
import ReactDOM from "react-dom";
import { FaMinus, FaPlus, FaPlay, FaSync, FaPause } from "react-icons/fa";

import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
  };

  render() {
    const { breakCount, sessionCount } = this.state;

    const breakProps = {
      title: "Break Lenght",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };

    const sessionProps = {
      title: "Session Lenght",
      count: sessionCount,
      handleDecrease: this.handleSesionDecrease,
      handleIncrease: this.handleSessionIncrease,
    };

    return (
      <div>
        <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="clock-container">
          <h1>Session</h1>
          <span>25:00</span>
          <div className="flex">
            <button onClick={this.handlePlayPause}>
              <FaPlay />
            </button>
            <button onClick={this.handleReset}>
              <FaSync />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const SetTimer = (props) => (
  <div className="timer-container">
    <h2>{props.title}</h2>
    <div className="flex actions-wrapper">
      <button onClick={props.handleDecrease}>
        <FaMinus />
      </button>
      <span>{props.count}</span>
      <button onClick={props.handleIncrease}>
        <FaPlus />
      </button>
    </div>
  </div>
);

ReactDOM.render(<App />, document.querySelector("#root"));

reportWebVitals();
