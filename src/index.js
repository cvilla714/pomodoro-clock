import React from "react";
import ReactDOM from "react-dom";
import { FaMinus, FaPlus, FaPlay, FaSync, FaPause } from "react-icons/fa";

import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";

const audio = document.getElementById("beep");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }

  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    // clockCount: 3,
    currentTimer: "Session",
    isPlaying: false,
  };

  componentWillUnmount() {
    clearInterval(this.loop);
  }

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
        const { clockCount, currentTimer, breakCount, sessionCount } = this.state;

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === "Session" ? "Break" : "Session",
            // clockCount: currentTimer === "Session" ? 3 : 3,
            clockCount: currentTimer === "Session" ? breakCount * 60 : sessionCount * 60,
          });

          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
    }
  };

  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      isPlaying: false,
    });

    clearInterval(this.loop);

    audio.pause();
    audio.currentTimer = 0;
  };

  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
  };

  handleLengthChange = (count, timerType) => {
    const { sessionCount, breakCount, isPlaying, currentTimer } = this.state;

    let newCount;

    if (timerType === "session") {
      newCount = sessionCount + count;
    } else {
      newCount = breakCount + count;
    }

    if (newCount > 0 && newCount < 61 && !isPlaying) {
      this.setState({
        [`${timerType}Count`]: newCount,
      });

      if (currentTimer.toLowerCase() === timerType) {
        this.setState({
          clockCount: newCount * 60,
        });
      }
    }
  };

  render() {
    const { breakCount, sessionCount, clockCount, currentTimer } = this.state;

    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, "break"),
      handleIncrease: () => this.handleLengthChange(1, "break"),
    };

    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, "session"),
      handleIncrease: () => this.handleLengthChange(1, "session"),
    };

    return (
      <div>
        <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>

        <div className="clock-container">
          <h1 id="timer-label">{currentTimer}</h1>
          <span id="time-left">{this.convertToTime(clockCount)}</span>

          <div className="flex">
            <button id="start_stop" onClick={this.handlePlayPause}>
              {this.state.isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button id="reset" onClick={this.handleReset}>
              <FaSync />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const SetTimer = (props) => {
  const id = props.title.toLowerCase();
  return (
    <div className="timer-container">
      <h2 id={`${id}-label`}>{props.title} Length</h2>
      <div className="flex actions-wrapper">
        <button id={`${id}-decrement`} onClick={props.handleDecrease}>
          <FaMinus />
        </button>
        <span id={`${id}-length`}>{props.count}</span>
        <button id={`${id}-increment`} onClick={props.handleIncrease}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));

reportWebVitals();
