import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AdsrUI from "./AdsrUI";
import GraphicAdsr from "./Adsr/GraphicAdsr";
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
    bypassed,
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
        <IconButton
          color={bypassed ? "default" : "primary"}
          onClick={event => toggleBypassed(id)}
        >
          {!bypassed && <i className="fas fa-power-off" />}
          {bypassed && <i className="fal fa-power-off" />}
        </IconButton>
        {label}
      </Typography>

      <WavePicker
        disabled={bypassed}
        id={id}
        onSelect={changeOscType}
        value={oscType}
        includeChromiumWaves
      />
      <Range
        disabled={bypassed}
        label="Gain"
        min={0}
        max={1}
        step={0.05}
        value={gain}
        onChange={event => changeGain(id, event.target.valueAsNumber)}
        output={Math.round(gain * 100) + "%"}
      />
      <Range
        disabled={bypassed}
        label={"Pan"}
        min={-1}
        max={1}
        step={0.01}
        value={pan}
        onChange={event => changePan(id, event.target.valueAsNumber)}
        output={Math.round(pan * 100)}
      />
      <Range
        disabled={bypassed}
        label="Pitch"
        min={-36}
        max={36}
        step={1}
        value={semitoneDetune}
        onChange={event => changeSemitoneDetune(id, event.target.valueAsNumber)}
        output={semitoneDetune}
      />
      <Range
        disabled={bypassed}
        label="Fine pitch"
        min={-100}
        max={100}
        step={1}
        value={detune}
        onChange={event => changeDetune(id, event.target.valueAsNumber)}
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
        disabled={bypassed}
        changeDelay={event => changeDelay(id, event.target.valueAsNumber)}
        changeAttack={event => changeAttack(id, event.target.valueAsNumber)}
        changeDecay={event => changeDecay(id, event.target.valueAsNumber)}
        changeSustain={event => changeSustain(id, event.target.valueAsNumber)}
        changeRelease={event => changeRelease(id, event.target.valueAsNumber)}
      />
      <GraphicAdsr
        delay={delay}
        attack={attack}
        decay={decay}
        sustain={sustain}
        release={release}
        disabled={bypassed}
        changeDelay={event => changeDelay(id, event.target.valueAsNumber)}
        changeAttack={event => changeAttack(id, event.target.valueAsNumber)}
        changeDecay={event => changeDecay(id, event.target.valueAsNumber)}
        changeSustain={event => changeSustain(id, event.target.valueAsNumber)}
        changeRelease={event => changeRelease(id, event.target.valueAsNumber)}
      />
    </div>
  );
}

export default VcoUI;
