import React from "react";
import ReactDOM from "react-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

// import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
const App = () => (
  <div>
    <SetTimer />
  </div>
);

const SetTimer = () => (
  <div className="div timer-container">
    <h1>Break Time</h1>
    <div>
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
