import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import VcoTone from "./VcoTone";
import VcoUI from "./VcoUI";

import ModulationDestinationActions from "../actions/ModulationDestinationActions";
import ModulationRoutingActions from "../actions/ModulationRoutingActions";
import ModulationSourceActions from "../actions/ModulationSourceActions";
import VcoActions from "../actions/VcoActions";

class Vco extends React.Component {
  state = {
    oscMenuAnchor: null,
    oscMenuOpen: false
  };

  constructor(props) {
    super(props);
    const {
      audioContext,
      id,
      label,
      modDestinations,
      registerModulationDestination,
      registerModulationSource,
      createRoute
    } = this.props;
    const { delay, gain, pan } = this.props.vco[id];

    const now = audioContext.currentTime;
    this.vcoOutput = audioContext.createGain();
    this.vcoPanner = audioContext.createStereoPanner();
    this.vcoDelay = audioContext.createDelay(5);
    this.numberOfOutputs = 0;
    this.vcoOutput.gain.setValueAtTime(gain / 3, now);
    this.vcoPanner.pan.setValueAtTime(pan, now);
    this.vcoDelay.delayTime.setValueAtTime(delay, now);
    registerModulationSource(id, label + " Output", "output");
    registerModulationDestination(
      id + "Gain",
      label + " Gain",
      this.vcoOutput.gain,
      1,
      "param"
    );
    registerModulationDestination(
      id + "Pan",
      label + " Pan",
      this.vcoPanner.pan,
      1,
      "param"
    );
    registerModulationDestination(
      id,
      label + " Pitch",
      "frequency",
      36,
      "voiceParam"
    );
    registerModulationDestination(
      id,
      label + " Fine Pitch",
      "detune",
      100,
      "voiceParam"
    );
    const mainOutputId = Object.values(modDestinations).find(
      dest => dest.paramId === "mainOutput"
    ).id;
    createRoute(id, mainOutputId);
    this.vcoDelay.connect(this.vcoPanner).connect(this.vcoOutput);
  }
  componentDidUpdate(prevProps) {
    const { audioContext, id, modRoutes } = this.props;
    const { delay, gain, pan } = this.props.vco[id];
    const now = audioContext.currentTime;
    this.vcoOutput.gain.setValueAtTime(gain / 3, now);
    this.vcoPanner.pan.setValueAtTime(pan, now);
    this.vcoDelay.delayTime.setValueAtTime(delay, now);
    const outputs = Object.values(modRoutes).filter(
      route => route.source === id
    );
    if (outputs.length !== this.numberOfOutputs) {
      this.numberOfOutputs = outputs.length;
      this.connectToOutputs();
    }
  }

  connectToOutputs = () => {
    const { id, modDestinations, modRoutes } = this.props;
    console.log("CONNECTING");
    this.vcoOutput.disconnect();
    Object.values(modRoutes)
      .filter(route => route.source === id && route.destination !== undefined)
      .forEach(({ destination }) =>
        this.vcoOutput.connect(modDestinations[destination].reference)
      );
  };

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
    modDestinations: state.modDestinations,
    modRoutes: state.modRoutes,
    vco: state.vco
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ModulationDestinationActions,
      ...ModulationRoutingActions,
      ...ModulationSourceActions,
      ...VcoActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vco);
