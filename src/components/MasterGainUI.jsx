import React from "react";

function MasterGainUI({ gain, changeGain }) {
  return (
    <div>
      <div>Master Gain:</div>
      <input
        type="range"
        min="0"
        max="1"
        step=".05"
        value={gain}
        onChange={changeGain}
      />
    </div>
  );
}

export default MasterGainUI;
