import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Break from "./Break";
import Focus from "./Focus";
import TimeLeft from "./TimeLeft";

function Pomodoro() {
  const [focusLength, setFocusLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);
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
    setFocusLength(focusLength + 300);
  };

  // Break Length Decrementation / Incrementation

  const decrementBreakLengthByOne = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength < 0) {
      setBreakLength(0);
    } else {
      setBreakLength(newBreakLength);
    }
  };

  const incrementBreakLengthByOne = () => {
    setBreakLength(breakLength + 60);
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
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
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <TimeLeft focusLength={focusLength} />
    </div>
  );
}

export default Pomodoro;
