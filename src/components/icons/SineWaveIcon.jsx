import React from "react";

function SineWaveIcon(props) {
  return (
    <svg
      data-name="Layer 2"
      viewBox="0 0 400 225"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M375 112.5a87.5 87.5 0 0 1-175 0M25 112.5a87.5 87.5 0 0 1 175 0"
        fill="none"
        stroke="#231f20"
        strokeMiterlimit={10}
        strokeWidth={50}
      />
    </svg>
  );
}

export default SineWaveIcon;
