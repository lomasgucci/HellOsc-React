import React from "react";

import Range from "./Range";

function AdsrUI(props) {
  const {
    attack,
    decay,
    sustain,
    release,
    changeAttack,
    changeDecay,
    changeSustain,
    changeRelease
  } = props;
  return (
    <div className="adsr">
      <Range
        label="Attack"
        min="0"
        max="5"
        step=".01"
        value={attack}
        onChange={changeAttack}
        output={ attack.toFixed(2) + "s"}
      />
      <Range
        label="Decay"
        min="0"
        max="5"
        step=".01"
        value={decay}
        onChange={changeDecay}
        output={decay.toFixed(2) + "s"}
      />
      <Range
        label="Sustain"
        min="0"
        max="1"
        step=".01"
        value={sustain}
        onChange={changeSustain}
        output={Math.round(sustain * 100) + "%"}
      />
      <Range
        label="Release"
        min="0"
        max="5"
        step=".01"
        value={release}
        onChange={changeRelease}
        output={release.toFixed(2) + "s"}
      />
    </div>
  );
}

export default AdsrUI;
