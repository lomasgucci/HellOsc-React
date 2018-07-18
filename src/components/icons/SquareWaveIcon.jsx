import React from "react";

function SquareWaveIcon(props) {
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
        d="M25 150v125h175V25h175v125"
      />
    </svg>
  );
}

export default SquareWaveIcon;
