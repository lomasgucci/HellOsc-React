import React from "react";
import Waves from "@mohayonao/wave-tables";

class VcoTone extends React.Component {
  componentDidMount() {
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
      registerParameter
    } = this.props;

    const noteFreq = this.noteNumberToFrequency(note.note.number);

    this.oscillator = audioContext.createOscillator();
    this.oscillator.frequency.value = noteFreq;
    this.oscillator.detune.value = detune;
    this.setOscillator(oscType);

    this.oscGain = audioContext.createGain();
    const now = audioContext.currentTime;
    const sustainGain = note.velocity * sustain;
    this.oscGain.gain.setValueAtTime(0, now);
    this.oscGain.gain.linearRampToValueAtTime(note.velocity, now + attack);
    this.oscGain.gain.linearRampToValueAtTime(
      sustainGain,
      now + attack + decay
    );

    // console.log("BREFORE REGISTER");
    // registerParameter(id + "gain", label + " Gain", this.gain.gain);

    this.oscillator.connect(this.oscGain).connect(output);
    this.oscillator.start();
  }

  componentDidUpdate(prevProps) {
    const { audioContext, detune, oscType } = this.props;
    this.oscillator.detune.setValueAtTime(detune, audioContext.currentTime);
    this.setOscillator(oscType);
  }
  componentWillUnmount() {
    const { audioContext, muted, output, release } = this.props;
    const now = audioContext.currentTime;
    if (muted) {
      this.oscGain.gain.setValueAtTime(0, now);
    } else {
      this.oscGain.gain.cancelAndHoldAtTime(now);
      this.oscGain.gain.linearRampToValueAtTime(0, now + release);
    }
    setTimeout(() => {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscGain.disconnect();
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

export default VcoTone;
