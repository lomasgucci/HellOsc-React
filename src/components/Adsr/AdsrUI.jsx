import React from "react";

import Range from "../Range";

function AdsrUI(props) {
  const {
    disabled,
    delay,
    attack,
    decay,
    sustain,
    release,
    changeDelay,
    changeAttack,
    changeDecay,
    changeSustain,
    changeRelease
  } = props;
  return (
    <div className="adsr">
      <Range
        disabled={disabled}
        label="Delay"
        min={0}
        max={5}
        step={0.001}
        value={delay}
        onChange={changeDelay}
        output={delay.toFixed(3) + "s"}
        vertical
        reverse
      />
      <Range
        disabled={disabled}
        label="Attack"
        min={0}
        max={5}
        step={0.001}
        value={attack}
        onChange={changeAttack}
        output={attack.toFixed(3) + "s"}
        vertical
        reverse
      />
      <Range
        disabled={disabled}
        label="Decay"
        min={0}
        max={5}
        step={0.001}
        value={decay}
        onChange={changeDecay}
        output={decay.toFixed(3) + "s"}
        vertical
        reverse
      />
      <Range
        disabled={disabled}
        label="Sustain"
        min={0}
        max={1}
        step={0.01}
        value={sustain}
        onChange={changeSustain}
        output={Math.round(sustain * 100) + "%"}
        vertical
        reverse
      />
      <Range
        disabled={disabled}
        label="Release"
        min={0}
        max={5}
        step={0.001}
        value={release}
        onChange={changeRelease}
        output={release.toFixed(3) + "s"}
        vertical
        reverse
      />
    </div>
  );
}

export default AdsrUI;
