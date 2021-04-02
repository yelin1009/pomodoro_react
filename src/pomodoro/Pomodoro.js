import React, { useEffect, useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Break from "./Break";
import Focus from "./Focus";

function Pomodoro() {
  const [currentSessionType, setCurrentSessionType] = useState("Focus");
  const [focusLength, setFocusLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);
  const [timeLeft, setTimeLeft] = useState(focusLength);
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  //Focus Length Decrementation / Incrementation

  const decrementFocusLengthByOneMinute = () => {
    const newFocusLength = focusLength - 300;

    if (newFocusLength < 300) {
      setFocusLength(300);
    } else {
      setFocusLength(newFocusLength);
    }
  };

  const incrementFocusLengthByOne = () => {
    const newFocusLength = focusLength + 300;

    if (newFocusLength > 3600) {
      setFocusLength(3600);
    } else {
      setFocusLength(newFocusLength);
    }
  };

  // Break Length Decrementation / Incrementation

  const decrementBreakLengthByOne = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength < 60) {
      setBreakLength(60);
    } else {
      setBreakLength(newBreakLength);
    }
  };

  const incrementBreakLengthByOne = () => {
    setBreakLength(breakLength + 60);
  };

  //formatted FocusLength

  const focusMinutes = Math.floor(focusLength / 60);
  const focusSeconds = focusLength % 60;
  let formattedFocusLength =
    focusMinutes.toString().padStart(2, "0") +
    ":" +
    focusSeconds.toString().padStart(2, "0");

  //TimeLeft formatization

  const timeLeftInMinutes = Math.floor(timeLeft / 60);
  const timeLeftInSeconds = timeLeft % 60;
  let formattedTimeLeft =
    timeLeftInMinutes.toString().padStart(2, "0") +
    ":" +
    timeLeftInSeconds.toString().padStart(2, "0");

  // TimeLeft

  useEffect(() => {
    setTimeLeft(focusLength);
  }, [focusLength]);

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running

      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        //switch to breakTime
        if (currentSessionType === "Focus") {
          setCurrentSessionType("Break");
          //setTimeLeft to breakTimeLength
          setTimeLeft(breakLength);
        } else if (currentSessionType === "Break") {
          //Switch back to focusTime
          setCurrentSessionType("Focus");
          setTimeLeft(focusLength);
        }
      }
    },
    isTimerRunning ? 1000 : null
  );

  // Pause Button

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  // Stop Button

  function stopButton() {
    if (isTimerRunning) {
      setTimeLeft(focusLength);
    }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <Focus
          focusLength={focusLength}
          decrementFocusLengthByOneMinute={decrementFocusLengthByOneMinute}
          incrementFocusLengthByOne={incrementFocusLengthByOne}
        />
        <Break
          breakLength={breakLength}
          decrementBreakLengthByOne={decrementBreakLengthByOne}
          incrementBreakLengthByOne={incrementBreakLengthByOne}
        />
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopButton}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
              Focusing for {formattedFocusLength} minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {formattedTimeLeft} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
