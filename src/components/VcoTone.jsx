import React from "react";
import Waves from "@mohayonao/wave-tables";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import VoiceActions from "../actions/VoiceActions";

class VcoTone extends React.Component {
  constructor(props) {
    super(props);
    const {
      id,
      label,
      attack,
      audioContext,
      decay,
      detune,
      note,
      oscType,
      output,
      sustain,
      registerVoice
    } = this.props;
    const noteFreq = this.noteNumberToFrequency(note.note.number);
    const now = audioContext.currentTime;

    this.oscillator = audioContext.createOscillator();
    this.oscillator.frequency.setValueAtTime(noteFreq, now);
    this.oscillator.detune.setValueAtTime(detune, now);
    this.setOscillator(oscType);

    this.oscGain = audioContext.createGain();
    const sustainGain = note.velocity * sustain;
    this.oscGain.gain.setValueAtTime(0, now);
    this.oscGain.gain.linearRampToValueAtTime(note.velocity, now + attack);
    this.oscGain.gain.linearRampToValueAtTime(
      sustainGain,
      now + attack + decay
    );

    this.oscillator.connect(this.oscGain).connect(output);

    registerVoice(id, this.oscillator);
  }

  componentDidMount() {
    this.oscillator.start();
  }

  componentDidUpdate(prevProps) {
    const { audioContext, detune, oscType } = this.props;
    this.oscillator.detune.setValueAtTime(detune, audioContext.currentTime);
    this.setOscillator(oscType);
  }
  componentWillUnmount() {
    const {
      audioContext,
      bypassed,
      id,
      output,
      release,
      unregisterVoice
    } = this.props;
    const now = audioContext.currentTime;
    if (bypassed) {
      this.oscGain.gain.setValueAtTime(0, now);
    } else {
      this.oscGain.gain.cancelAndHoldAtTime(now);
      this.oscGain.gain.linearRampToValueAtTime(0, now + release);
    }
    setTimeout(() => {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscGain.disconnect();
      unregisterVoice(id, this.oscillator);
    }, release * 1000);
  }

  setOscillator(oscType) {
    const { audioContext } = this.props;
    switch (oscType) {
      case "sine":
      case "square":
      case "sawtooth":
      case "triangle":
        this.oscillator.type = oscType;
        break;
      default:
        const waveTable = Waves[oscType];
        const periodicWave = audioContext.createPeriodicWave(
          waveTable.real,
          waveTable.imag
        );
        this.oscillator.setPeriodicWave(periodicWave);
        break;
    }
  }

  noteNumberToFrequency = noteNumber => {
    return 440 * Math.pow(2, (noteNumber - 69) / 12);
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return { lfo: state.lfo, paramRouting: state.paramRouting };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...VoiceActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VcoTone);
