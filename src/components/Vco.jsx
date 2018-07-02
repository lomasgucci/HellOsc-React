import React from "react";

import VcoTone from "./VcoTone";
import VcoUI from "./VcoUI";

class Vco extends React.Component {
  state = {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0.1,
    detune: 0,
    gain: 1.0,
    oscMenuAnchor: null,
    oscMenuOpen: false,
    oscType: "sine",
    pan: 0,
    semitoneDetune: 0,
    bypassed: false
  };

  componentDidMount() {
    const { audioContext, mainOutput } = this.props;
    const { gain } = this.state;
    this.vcoOutput = audioContext.createGain();
    this.vcoOutput.gain.setValueAtTime(gain, audioContext.currentTime);
    this.vcoOutput.connect(mainOutput);
  }

  componentDidUpdate() {
    const { audioContext } = this.props;
    const { gain } = this.state;
    this.vcoOutput.gain.setValueAtTime(gain, audioContext.currentTime);
  }

  changeDetune = event =>
    this.setState({ detune: Number.parseFloat(event.target.value) });

  changeSemitoneDetune = event =>
    this.setState({ semitoneDetune: Number.parseFloat(event.target.value) });

  changeGain = event => this.setState({ gain: event.target.value });

  changeOscType = oscType => this.setState({ oscType });

  changePan = event => this.setState({ pan: event.target.value });

  /*
    ENVELOPE CONTROLLERS
  */
  changeAttack = event =>
    this.setState({ attack: Number.parseFloat(event.target.value) });

  changeDecay = event =>
    this.setState({ decay: Number.parseFloat(event.target.value) });

  changeSustain = event =>
    this.setState({ sustain: Number.parseFloat(event.target.value) });

  changeRelease = event =>
    this.setState({ release: Number.parseFloat(event.target.value) });

  toggleMuted = event => this.setState({ bypassed: event.target.checked });

  toggleOscMenu = oscMenuAnchor =>
    this.setState({ oscMenuOpen: !this.state.oscMenuOpen, oscMenuAnchor });

  render() {
    const { audioContext, label, mainOutputMuted, notes } = this.props;
    const {
      attack,
      decay,
      detune,
      gain,
      oscMenuAnchor,
      oscMenuOpen,
      oscType,
      pan,
      release,
      semitoneDetune,
      sustain,
      bypassed
    } = this.state;

    const fullDetune = semitoneDetune * 100 + detune;

    const muted = bypassed || mainOutputMuted;

    if (audioContext && !muted) {
      return (
        <div className="vco">
          <VcoUI
            detune={detune}
            gain={gain}
            label={label}
            muted={muted}
            oscMenuAnchor={oscMenuAnchor}
            oscMenuOpen={oscMenuOpen}
            oscType={oscType}
            pan={pan}
            semitoneDetune={semitoneDetune}
            attack={attack}
            decay={decay}
            sustain={sustain}
            release={release}
            changeDetune={this.changeDetune}
            changeGain={this.changeGain}
            changeOscType={this.changeOscType}
            changePan={this.changePan}
            changeSemitoneDetune={this.changeSemitoneDetune}
            changeAttack={this.changeAttack}
            changeDecay={this.changeDecay}
            changeSustain={this.changeSustain}
            changeRelease={this.changeRelease}
            toggleMuted={this.toggleMuted}
            toggleOscMenu={this.toggleOscMenu}
          />
          {notes.map(note => (
            <VcoTone
              audioContext={audioContext}
              detune={fullDetune}
              key={label + "Note" + note.note.number}
              muted={muted}
              note={note}
              numberOfNotes={notes.length}
              oscType={oscType}
              output={this.vcoOutput}
              pan={pan}
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
            label={label}
            muted={muted}
            oscMenuAnchor={oscMenuAnchor}
            oscMenuOpen={oscMenuOpen}
            oscType={oscType}
            pan={pan}
            semitoneDetune={semitoneDetune}
            attack={attack}
            decay={decay}
            sustain={sustain}
            release={release}
            changeDetune={this.changeDetune}
            changeGain={this.changeGain}
            changeOscType={this.changeOscType}
            changePan={this.changePan}
            changeSemitoneDetune={this.changeSemitoneDetune}
            changeAttack={this.changeAttack}
            changeDecay={this.changeDecay}
            changeSustain={this.changeSustain}
            changeRelease={this.changeRelease}
            toggleMuted={this.toggleMuted}
            toggleOscMenu={this.toggleOscMenu}
          />
        </div>
      );
    }
  }
}

export default Vco;
