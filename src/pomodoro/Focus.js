import React from "react";

function Focus({
  focusLength,
  decrementFocusLengthByOneMinute,
  incrementFocusLengthByOne,
}) {
  // Focus Length formatization

  const focusMinutes = Math.floor(focusLength / 60);
  const focusSeconds = focusLength % 60;
  let formattedFocusLength =
    focusMinutes.toString().padStart(2, "0") +
    ":" +
    focusSeconds.toString().padStart(2, "0");

  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* TODO: Update this text to display the current focus session duration */}
          Focus Duration: {formattedFocusLength}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            id="focus-decrement"
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={decrementFocusLengthByOneMinute}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
          <button
            id="focus-increment"
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={incrementFocusLengthByOne}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Focus;
