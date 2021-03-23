import React from "react";
import ReactDOM from "react-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
class App extends React.Component {
  render() {
    return (
      <div>
        <div className="flex">
          <SetTimer />
          <SetTimer />
        </div>
        <div>clock goes here</div>
      </div>
    );
  }
}

const SetTimer = () => (
  <div className="timer-container">
    <h1>Break Time</h1>
    <div className="flex actions-wrapper">
      <button>
        <FaMinus />
      </button>
      <span>5</span>
      <button>
        <FaPlus />
      </button>
    </div>
  </div>
);

ReactDOM.render(<App />, document.querySelector("#root"));

reportWebVitals();
