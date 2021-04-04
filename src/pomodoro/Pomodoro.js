import React, { useEffect, useState, useRef } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Break from "./Break";
import Focus from "./Focus";
import TimeLeft from "./TimeLeft";

function Pomodoro() {
  const audioElement = useRef(null);
  const [currentSessionType, setCurrentSessionType] = useState("Focus");
  const [currentState, setCurrentState] = useState("Focusing");
  const [focusLength, setFocusLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);
  const [timeLeft, setTimeLeft] = useState(focusLength);
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState("");
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ariaValue, setAriaValue] = useState("0");

  //Focus Length Decrementation / Incrementation

  const decrementFocusLengthByOne = () => {
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

  // Break Length Formatization

  const breakMinutes = Math.floor(breakLength / 60);
  const breakSeconds = breakLength % 60;
  let formattedBreakLength =
    breakMinutes.toString().padStart(2, "0") +
    ":" +
    breakSeconds.toString().padStart(2, "0");

  // Focus Length formatization

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

  // Interval

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      let newProgress = 100 / focusLength;
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        setProgress(progress + newProgress);
        setAriaValue(progress.toString());
      } else if (timeLeft === 0) {
        setProgress(0);
        setAriaValue("0");
        if (currentSessionType === "Focus") {
          newProgress = 100 / breakLength;
          setCurrentSessionType("Break");
          setCurrentState("On Break");
          setTimeLeft(breakLength);
          //setTimeLeft to breakTimeLength
        } else if (currentSessionType === "Break") {
          //Switch back to focusTime

          setCurrentSessionType("Focus");
          setCurrentState("Focusing");
          setTimeLeft(focusLength);
        }
      }
    },
    isTimerRunning ? 1000 : null
  );

  // Pause Button

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    if (!isTimerRunning) {
      setIsPaused("");
      setHidden(true);
    } else {
      setIsPaused("Paused");
    }
  }

  // Stop Button
  const handleStopButton = () => {
    //clear the timeout interval
    setTimeLeft(focusLength);
    setIsTimerRunning(false);
    setHidden(false);
    setProgress(0);
    setAriaValue("0");
    setCurrentSessionType("Focus");
    setCurrentState("Focus");
    // set the interval null
    // set the sessiontype to 'Session'
  };

  //Play Audio

  return (
    <div className="pomodoro">
      <div className="row">
        <Focus
          formattedFocusLength={formattedFocusLength}
          decrementFocusLengthByOneMinute={decrementFocusLengthByOne}
          incrementFocusLengthByOne={incrementFocusLengthByOne}
        />
        <Break
          formattedBreakLength={formattedBreakLength}
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
              onClick={handleStopButton}
            >
              <span className="oi oi-media-stop" />
            </button>
            <audio id="beep" ref={audioElement}>
              <source src="public/alarm/alarm-clock-buzzer-beeps.mp3"></source>
            </audio>
          </div>
        </div>
      </div>
      <TimeLeft
        currentState={currentState}
        formattedTimeLeft={formattedTimeLeft}
        isPaused={isPaused}
        hidden={hidden}
        ariaValue={ariaValue}
      />
    </div>
  );
}

export default Pomodoro;
