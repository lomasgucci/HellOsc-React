import React from "react";
import WebMidi from "webmidi";

function MidiInputSelector({
  changeMidiInput,
  midiEnabled,
  selectedInput,
  midiInputs
}) {
  if (midiEnabled) {
    return (
      <div>
        <select value={selectedInput} onChange={changeMidiInput}>
          <option key="midiNoneOption" value="none">
            -
          </option>
          {midiInputs.map(input => (
            <option key={input.id} value={input.id}>
              {input.name}
            </option>
          ))}
        </select>
      </div>
    );
  } else return <div>Midi is not enabled</div>;
}

export default MidiInputSelector;
