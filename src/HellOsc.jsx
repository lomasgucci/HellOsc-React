import React from "react";
import WebMidi from "webmidi";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";

import EffectsMenu from "./components/EffectsMenu";
import Lfo from "./components/Lfo/Lfo";
import MasterGainUI from "./components/MasterGainUI";
import MidiInputSelector from "./components/MidiInputSelector";
import ModulationRouter from "./components/ModulationRouter/ModulationRouter";
import Vco from "./components/Vco";

import store from "./store";
import ModulationDestinationActions from "./actions/ModulationDestinationActions";
import LfoActions from "./actions/LfoActions";
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
    const { changeVcoOutput, registerModulationDestination } = this.props;
    const { gain } = this.state;
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.mainOutput = this.audioContext.createGain();
    this.mainOutput.gain.value = gain;
    this.mainOutput.connect(this.audioContext.destination);
    // changeVcoOutput("vco1", this.mainOutput);
    // changeVcoOutput("vco2", this.mainOutput);
    // changeVcoOutput("vco3", this.mainOutput);

    this.enableMidi();

    registerModulationDestination(
      "mainOutput",
      "Main Output",
      this.mainOutput,
      1,
      "input"
    );
  }

  componentDidUpdate() {
    const { gain, midiEnabled } = this.state;
    this.mainOutput.gain.setValueAtTime(gain, this.audioContext.currentTime);
    //This is for Codesandbox hot reloading
    if (WebMidi.enabled && !midiEnabled) {
      this.enableMidi();
    }
  }

  componentWillUnmount() {
    this.audioContext.close();
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

  changeGain = event => this.setState({ gain: event.target.valueAsNumber });

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
      WebMidi.getInputById(selectedMidiInput).addListener(
        "controlchange",
        "all",
        event => {
          //console.log(event);
        }
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

  reset = () => {
    store.dispatch({ type: "RESET" });
  };

  saveState = () => {
    console.log(store, store.getState());
  };

  render() {
    const { createLfo, lfo } = this.props;
    const {
      gain,
      mainOutputMuted,
      midiEnabled,
      selectedMidiInput,
      midiInputs,
      notes
    } = this.state;

    if (this.audioContext) {
      return (
        <div>
          <MidiInputSelector
            midiEnabled={midiEnabled}
            midiInputs={midiInputs}
            selectedInput={selectedMidiInput}
            changeMidiInput={this.changeMidiInput}
          />
          <IconButton onClick={this.saveState}>
            <i className="fal fa-save" />
          </IconButton>
          <IconButton onClick={this.reset}>
            <i className="fal fa-trash" />
          </IconButton>
          <div className="vco-container">
            <Vco
              audioContext={this.audioContext}
              id="vco1"
              label="VCO 1"
              mainOutputGain={gain}
              mainOutput={this.mainOutput}
              mainOutputMuted={mainOutputMuted}
              notes={notes}
            />
            <Vco
              audioContext={this.audioContext}
              id="vco2"
              label="VCO 2"
              mainOutputGain={gain}
              mainOutput={this.mainOutput}
              mainOutputMuted={mainOutputMuted}
              notes={notes}
            />
            <Vco
              audioContext={this.audioContext}
              id="vco3"
              label="VCO 3"
              mainOutputGain={gain}
              mainOutput={this.mainOutput}
              mainOutputMuted={mainOutputMuted}
              notes={notes}
            />
          </div>
          <MasterGainUI gain={gain} changeGain={this.changeGain} />
          <ModulationRouter />
          <EffectsMenu />
          {Object.keys(lfo).map(id => {
            return (
              <Lfo
                audioContext={this.audioContext}
                key={id}
                id={id}
                masterGainLevel={gain}
              />
            );
          })}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...VcoActions, ...LfoActions, ...ModulationDestinationActions },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HellOsc);
