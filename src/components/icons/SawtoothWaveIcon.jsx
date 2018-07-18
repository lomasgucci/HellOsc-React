import React from "react";

function SawtoothWaveIcon(props) {
  return (
    <svg
      data-name="Layer 2"
      viewBox="0 0 400 300"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="#231f20"
        strokeMiterlimit={10}
        strokeWidth={50}
        d="M25 0v250L375 50v250"
      />
    </svg>
  );
}

export default SawtoothWaveIcon;
