import React from "react";
import ParameterCircle from "./ParameterCircle";

const width = 225;
const height = 100;
const totalMilliseconds = 20000;
const circleRadius = 3;

class GraphicAdsr extends React.Component {
  constructor() {
    super();
  }

  onHoverOverPoints = event => {
    event.target.setAttribute("r", "4");
  };

  onHoverOffPoints = event => {
    event.target.setAttribute("r", "2");
  };

  render() {
    const {
      delay,
      attack,
      decay,
      sustain,
      release,
      changeDelay,
      changeAttack,
      changeDecay,
      changeSustain,
      changeRelease,
      zoomToFit
    } = this.props;

    const delayMs = delay * 1000;
    const attackMs = attack * 1000;
    const decayMs = decay * 1000;
    const releaseMs = release * 1000;
    const sustainPercent = sustain * 100;
    const settingsTotal = delay + attack + decay + release;

    const delayX = width * delayMs / totalMilliseconds;
    const delayY = 100;
    const attackX = width * attackMs / totalMilliseconds + delayX;
    const attackY = 0;
    const decayX = width * decayMs / totalMilliseconds + attackX;
    const decayY = height - sustainPercent;
    const releaseX = width * releaseMs / totalMilliseconds + decayX;
    const releaseY = 100;
    return (
      <svg className="graphic-adsr" viewBox={`0 0 ${width} ${height}`}>
        <g fill="red">
          <rect x="0" y="0" width={width} height={height} />
        </g>
        <g stroke="green" strokeWidth={2}>
          <line x1={delayX} y1={delayY} x2={attackX} y2={attackY} />
          <line x1={attackX} y1={attackY} x2={decayX} y2={decayY} />
          <line x1={decayX} y1={decayY} x2={releaseX} y2={releaseY} />
        </g>
        <g fill="blue">
          <ParameterCircle
            x={delayX}
            y={delayY}
            radius={3}
            onChange={changeDelay}
          />
          <ParameterCircle x={attackX} y={attackY} radius={3} />
          <ParameterCircle x={decayX} y={decayY} radius={3} />
          <ParameterCircle x={releaseX} y={releaseY} radius={3} />
        </g>
      </svg>
    );
  }
}

export default GraphicAdsr;
