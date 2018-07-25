import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import VcoTone from "./VcoTone";
import VcoUI from "./VcoUI";

import ModulationDestinationActions from "../actions/ModulationDestinationActions";
import VcoActions from "../actions/VcoActions";

class Vco extends React.Component {
  state = {
    oscMenuAnchor: null,
    oscMenuOpen: false
  };

  componentDidMount() {
    const {
      audioContext,
      id,
      label,
      registerModulationDestination
    } = this.props;
    const { delay, gain, output, pan } = this.props.vco[id];
    const now = audioContext.currentTime;
    this.vcoOutput = audioContext.createGain();
    this.vcoPanner = audioContext.createStereoPanner();
    this.vcoDelay = audioContext.createDelay(5);
    this.vcoOutput.gain.setValueAtTime(gain, now);
    this.vcoPanner.pan.setValueAtTime(pan, now);
    this.vcoDelay.delayTime.setValueAtTime(delay, now);
    registerModulationDestination(
      id + "Gain",
      label + " Gain",
      this.vcoOutput.gain,
      1
    );
    registerModulationDestination(
      id + "Pan",
      label + " Pan",
      this.vcoPanner.pan,
      1
    );
    registerModulationDestination(id, label + " Pitch", "frequency", 36);
    registerModulationDestination(id, label + " Fine Pitch", "detune", 100);
    if (output)
      this.vcoDelay
        .connect(this.vcoPanner)
        .connect(this.vcoOutput)
        .connect(output);
  }

  componentDidUpdate() {
    const { audioContext, id } = this.props;
    const { delay, gain, pan } = this.props.vco[id];
    const now = audioContext.currentTime;
    this.vcoOutput.gain.setValueAtTime(gain, now);
    this.vcoPanner.pan.setValueAtTime(pan, now);
    this.vcoDelay.delayTime.setValueAtTime(delay, now);
  }

  toggleOscMenu = oscMenuAnchor =>
    this.setState({ oscMenuOpen: !this.state.oscMenuOpen, oscMenuAnchor });

  render() {
    const {
      audioContext,
      id,
      label,
      mainOutputMuted,
      notes,
      changeOscType,
      changeDelay,
      changeAttack,
      changeDecay,
      changeSustain,
      changeRelease,
      changeDetune,
      changeSemitoneDetune,
      changePan,
      changeGain,
      toggleBypassed
    } = this.props;
    const {
      oscType,
      delay,
      attack,
      decay,
      sustain,
      release,
      detune,
      semitoneDetune,
      pan,
      gain,
      bypassed
    } = this.props.vco[id];
    const { oscMenuAnchor, oscMenuOpen } = this.state;

    const fullDetune = semitoneDetune * 100 + detune;

    const muted = bypassed || mainOutputMuted;

    if (audioContext && !muted) {
      return (
        <div className="vco">
          <VcoUI
            detune={detune}
            gain={gain}
            id={id}
            label={label}
            bypassed={muted}
            oscMenuAnchor={oscMenuAnchor}
            oscMenuOpen={oscMenuOpen}
            oscType={oscType}
            pan={pan}
            semitoneDetune={semitoneDetune}
            delay={delay}
            attack={attack}
            decay={decay}
            sustain={sustain}
            release={release}
            changeDetune={changeDetune}
            changeGain={changeGain}
            changeOscType={changeOscType}
            changePan={changePan}
            changeSemitoneDetune={changeSemitoneDetune}
            changeDelay={changeDelay}
            changeAttack={changeAttack}
            changeDecay={changeDecay}
            changeSustain={changeSustain}
            changeRelease={changeRelease}
            toggleBypassed={toggleBypassed}
            toggleOscMenu={this.toggleOscMenu}
          />
          {notes.map(note => (
            <VcoTone
              audioContext={audioContext}
              id={id}
              label={label}
              detune={fullDetune}
              key={label + "Note" + note.note.number}
              bypassed={muted}
              note={note}
              numberOfNotes={notes.length}
              oscType={oscType}
              output={this.vcoDelay}
              delay={delay}
              attack={attack}
              decay={decay}
              sustain={sustain}
              release={release}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="vco">
          <VcoUI
            detune={detune}
            gain={gain}
            id={id}
            label={label}
            bypassed={muted}
            oscMenuAnchor={oscMenuAnchor}
            oscMenuOpen={oscMenuOpen}
            oscType={oscType}
            pan={pan}
            semitoneDetune={semitoneDetune}
            delay={delay}
            attack={attack}
            decay={decay}
            sustain={sustain}
            release={release}
            changeDetune={changeDetune}
            changeGain={changeGain}
            changeOscType={changeOscType}
            changePan={changePan}
            changeSemitoneDetune={changeSemitoneDetune}
            changeDelay={changeDelay}
            changeAttack={changeAttack}
            changeDecay={changeDecay}
            changeSustain={changeSustain}
            changeRelease={changeRelease}
            toggleBypassed={toggleBypassed}
            toggleOscMenu={this.toggleOscMenu}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    vco: state.vco
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...ModulationDestinationActions, ...VcoActions },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vco);
