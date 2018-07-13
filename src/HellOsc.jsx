import React from "react";
import WebMidi from "webmidi";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import LFO from "./components/LFO";
import MasterGainUI from "./components/MasterGainUI";
import MidiInputSelector from "./components/MidiInputSelector";
import Vco from "./components/Vco";

import VcoActions from "./actions/VcoActions";

class HellOsc extends React.Component {
  state = {
    gain: 0.5,
    mainOutputMuted: false,
    midiEnabled: false,
    selectedMidiInput: "none",
    muted: true,
    notes: []
  };

  componentDidMount() {
    const { changeVcoOutput } = this.props;
    const { gain } = this.state;
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const mainOutput = audioContext.createGain();
    mainOutput.gain.value = gain;
    mainOutput.connect(audioContext.destination);
    changeVcoOutput("vco1", mainOutput);
    changeVcoOutput("vco2", mainOutput);
    changeVcoOutput("vco3", mainOutput);
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

  componentWillUnmount() {
    const { audioContext } = this.state;
    audioContext.close();
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
          <div className="vco-container">
            <Vco
              audioContext={audioContext}
              id="vco1"
              label="VCO 1"
              mainOutputGain={gain}
              mainOutput={mainOutput}
              mainOutputMuted={mainOutputMuted}
              notes={notes}
            />
            <Vco
              audioContext={audioContext}
              id="vco2"
              label="VCO 2"
              mainOutputGain={gain}
              mainOutput={mainOutput}
              mainOutputMuted={mainOutputMuted}
              notes={notes}
            />
            <Vco
              audioContext={audioContext}
              id="vco3"
              label="VCO 3"
              mainOutputGain={gain}
              mainOutput={mainOutput}
              mainOutputMuted={mainOutputMuted}
              notes={notes}
            />
          </div>
          <LFO audioContext={audioContext} id="lfo1" label="LFO 1" />
          <LFO audioContext={audioContext} id="lfo2" label="LFO 2" />
          <MasterGainUI gain={gain} changeGain={this.changeGain} />
        </div>
      );
    } else {
      return <div>Loading Audio</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    lfo: state.lfo,
    vco: state.vco
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(VcoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HellOsc);
