import React from "react";

import Typography from "@material-ui/core/Typography";

import AdsrUI from "./AdsrUI";
import Range from "./Range";
import WavePicker from "./WavePicker";

function VcoUI(props) {
  const {
    delay,
    attack,
    decay,
    detune,
    gain,
    id,
    label,
    muted,
    oscType,
    pan,
    release,
    semitoneDetune,
    sustain,
    changeDelay,
    changeAttack,
    changeDecay,
    changeDetune,
    changeGain,
    changeOscType,
    changePan,
    changeRelease,
    changeSemitoneDetune,
    changeSustain,
    toggleBypassed
  } = props;

  return (
    <div>
      <Typography variant="headline" gutterBottom>
        {label}
      </Typography>

      <WavePicker id={id} onSelect={changeOscType} value={oscType} />
      <Range
        label="Gain"
        min="0"
        max="1"
        step=".05"
        value={gain}
        onChange={event => changeGain(id, event.target.value)}
        output={Math.round(gain * 100) + "%"}
      />
      <Range
        label={"Pan"}
        min="-1"
        max="1"
        step=".01"
        value={pan}
        onChange={event => changePan(id, event.target.value)}
        output={Math.round(pan * 100)}
      />
      <Range
        label="Pitch (semitones)"
        min="-36"
        max="36"
        step="1"
        value={semitoneDetune}
        onChange={event => changeSemitoneDetune(id, event.target.value)}
        output={semitoneDetune}
      />
      <Range
        label="Fine pitch (cents)"
        min="-100"
        max="100"
        step="1"
        value={detune}
        onChange={event => changeDetune(id, event.target.value)}
        output={detune}
      />
      <AdsrUI
        delay={delay}
        attack={attack}
        decay={decay}
        sustain={sustain}
        release={release}
        id={id}
        label={label}
        changeDelay={event => changeDelay(id, event.target.value)}
        changeAttack={event => changeAttack(id, event.target.value)}
        changeDecay={event => changeDecay(id, event.target.value)}
        changeSustain={event => changeSustain(id, event.target.value)}
        changeRelease={event => changeRelease(id, event.target.value)}
      />
      <div>Bypass {label}</div>
      <input
        type="checkbox"
        checked={muted}
        onChange={event => toggleBypassed(id, event.target.checked)}
      />
    </div>
  );
}

export default VcoUI;
