import React from "react";

import Typography from "@material-ui/core/Typography";

import AdsrUI from "./AdsrUI";
import Range from "./Range";
import WavePicker from "./WavePicker";

function VcoUI(props) {
  const {
    attack,
    decay,
    detune,
    gain,
    label,
    muted,
    oscMenuAnchor,
    oscMenuOpen,
    oscType,
    pan,
    release,
    semitoneDetune,
    sustain,
    changeAttack,
    changeDecay,
    changeDetune,
    changeGain,
    changeOscType,
    changePan,
    changeRelease,
    changeSemitoneDetune,
    changeSustain,
    toggleMuted,
    toggleOscMenu
  } = props;

  return (
    <div>
      <Typography variant="headline" gutterBottom>
        {label}
      </Typography>

      <WavePicker onSelect={changeOscType} value={oscType} />
      <Range
        label="Gain"
        min="0"
        max="1"
        step=".05"
        value={gain}
        onChange={changeGain}
        output={Math.round(gain * 100) + "%"}
      />
      <Range
        label={"Pan"}
        min="-1"
        max="1"
        step=".01"
        value={pan}
        onChange={changePan}
        output={Math.round(pan * 100)}
      />
      <Range
        label="Pitch (semitones)"
        min="-36"
        max="36"
        step="1"
        value={semitoneDetune}
        onChange={changeSemitoneDetune}
        output={semitoneDetune}
      />
      <Range
        label="Fine pitch (cents)"
        min="-100"
        max="100"
        step="1"
        value={detune}
        onChange={changeDetune}
        output={detune}
      />
      <AdsrUI
        attack={attack}
        decay={decay}
        sustain={sustain}
        release={release}
        label={label}
        changeAttack={changeAttack}
        changeDecay={changeDecay}
        changeSustain={changeSustain}
        changeRelease={changeRelease}
      />
      <div>Bypass {label}</div>
      <input type="checkbox" checked={muted} onChange={toggleMuted} />
    </div>
  );
}

export default VcoUI;
