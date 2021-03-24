import React from "react";
import ReactDOM from "react-dom";
import { FaMinus, FaPlus, FaPlay, FaSync, FaPause, FaThemeisle } from "react-icons/fa";

import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }

  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: "Session",
    isPlaying: false,
    loop: undefined,
  };

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false,
      });
    } else {
      this.setState({
        isPlaying: true,
      });
      this.loop = setInterval(() => {
        const { clockCount } = this.state;
        this.setState({
          clockCount: clockCount - 1,
        });
      }, 1000);
    }
  };

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  convertToTime = (count) => {
    const minutes = Math.floor(count / 60);
    let seconds = count % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
  };

  render() {
    const { breakCount, sessionCount, clockCount, currentTimer } = this.state;

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
          <h1>{currentTimer}</h1>
          <span>{this.convertToTime(clockCount)}</span>
          <div className="flex">
            <button onClick={this.handlePlayPause}>{this.state.isPlaying ? <FaPause /> : <FaPlay />}</button>
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
