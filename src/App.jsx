import React from "react";
import WebMidi from "webmidi";

import DecibalMeter from "./components/DecibalMeter";
import LFO from "./components/LFO";
import MasterGainUI from "./components/MasterGainUI";
import MidiInputSelector from "./components/MidiInputSelector";
import Vco from "./components/Vco";

class App extends React.Component {
  state = {
    gain: 0.5,
    mainOutputMuted: false,
    midiEnabled: false,
    selectedMidiInput: "none",
    muted: true,
    notes: []
  };

  componentDidMount() {
    const { gain } = this.state;
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const mainOutput = audioContext.createGain();
    mainOutput.gain.value = gain;
    mainOutput.connect(audioContext.destination);
    this.setState({ audioContext, mainOutput });

    this.enableMidi();
  }

  componentDidUpdate() {
    const { audioContext, gain, mainOutput, midiEnabled } = this.state;
    mainOutput.gain.setValueAtTime(gain, audioContext.currentTime);
    if (WebMidi.enabled && !midiEnabled) {
      this.enableMidi();
    }
  }

  enableMidi = () => {
    const { midiEnabled } = this.state;
    const selectedMidiInput = window.localStorage.getItem("midi-controller-id");
    if (WebMidi.enabled && !midiEnabled) {
      this.setState({ midiInputs: WebMidi.inputs, midiEnabled: true });
      if (selectedMidiInput) {
        this.changeMidiInput({ target: { value: selectedMidiInput } });
      }
    } else {
      WebMidi.enable(err => {
        if (err) {
          console.log("Error enabling Midi support", err.message);
        } else {
          console.log("Midi Enabled!");
          if (selectedMidiInput) {
            this.changeMidiInput({ target: { value: selectedMidiInput } });
          }
          this.setState({ midiInputs: WebMidi.inputs, midiEnabled: true });

          WebMidi.addListener("connected", () =>
            this.setState({ midiInputs: WebMidi.inputs })
          );
          WebMidi.addListener("disconnected", () =>
            this.setState({ midiInputs: WebMidi.inputs })
          );
        }
      });
    }
  };

  changeGain = event =>
    this.setState({ gain: Number.parseFloat(event.target.value) });

  changeMidiInput = event => {
    const currentMidiInput = this.state.selectedMidiInput;
    const selectedMidiInput = event.target.value;

    if (currentMidiInput !== "none") {
      WebMidi.getInputById(currentMidiInput).removeListener();
    }

    if (selectedMidiInput !== "none") {
      WebMidi.getInputById(selectedMidiInput).addListener(
        "noteon",
        "all",
        this.noteOn
      );
      WebMidi.getInputById(selectedMidiInput).addListener(
        "noteoff",
        "all",
        this.noteOff
      );
    }
    this.setState({ selectedMidiInput });
    window.localStorage.setItem("midi-controller-id", selectedMidiInput);
  };

  noteOn = data => {
    //console.log(data);
    const notes = [...this.state.notes];
    notes.push(data);
    this.setState({ notes });
  };

  noteOff = data => {
    //console.log(data);
    const notes = [...this.state.notes];
    const index = notes.findIndex(
      note => note.note.number === data.note.number
    );
    notes.splice(index, 1);
    this.setState({ notes });
  };

  render() {
    const {
      audioContext,
      gain,
      mainOutput,
      mainOutputMuted,
      midiEnabled,
      selectedMidiInput,
      midiInputs,
      notes
    } = this.state;

    if (audioContext) {
      return (
        <div>
          <MidiInputSelector
            midiEnabled={midiEnabled}
            midiInputs={midiInputs}
            selectedInput={selectedMidiInput}
            changeMidiInput={this.changeMidiInput}
          />
          <Vco
            audioContext={audioContext}
            label="VCO 1"
            mainOutputGain={gain}
            mainOutput={mainOutput}
            mainOutputMuted={mainOutputMuted}
            notes={notes}
          />
          <Vco
            audioContext={audioContext}
            label="VCO 2"
            mainOutputGain={gain}
            mainOutput={mainOutput}
            mainOutputMuted={mainOutputMuted}
            notes={notes}
          />
          <Vco
            audioContext={audioContext}
            label="VCO 3"
            mainOutputGain={gain}
            mainOutput={mainOutput}
            mainOutputMuted={mainOutputMuted}
            notes={notes}
          />
          <LFO audioContext={audioContext} gain={gain} output={mainOutput} />
          <MasterGainUI gain={gain} changeGain={this.changeGain} />
        </div>
      );
    } else {
      return <div>Loading Audio</div>;
    }
  }
}

export default App;
