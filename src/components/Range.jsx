import React from "react";

function Range(props) {
  const { label, max, min, step, value, onChange, output } = props;
  return (
    <div className="range">
      <div className="range-label">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <div className="range-output">{output}</div>
    </div>
  );
}

export default Range;
