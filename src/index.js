import React from "react";
import ReactDOM from "react-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

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
        <div>clock goes here</div>
      </div>
    );
  }
}

const SetTimer = (props) => (
  <div className="timer-container">
    <h1>{props.title}</h1>
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
