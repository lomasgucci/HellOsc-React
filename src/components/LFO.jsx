import React from "react";

import Range from "./Range";

class LFO extends React.Component {
  state = {
    bypassed: true,
    frequency: 20,
    waveType: "sine"
  };

  componentDidMount() {
    const { audioContext, output } = this.props;
    const { bypassed, frequency, waveType } = this.state;
    this.lfo = audioContext.createOscillator();
    this.gain = audioContext.createGain();
    this.gain.gain.value = 1.0;
    this.lfo.frequency.value = frequency;
    this.lfo.type = waveType;
    this.lfo.connect(this.gain);
    this.lfo.start();
    if (!bypassed) {
      this.gain.connect(output.gain);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { audioContext, output } = this.props;
    const { bypassed, frequency, waveType } = this.state;
    if (!prevState.bypassed && bypassed) {
      this.gain.disconnect(output.gain);
    } else if (prevState.bypassed && !bypassed) {
      this.gain.connect(output.gain);
    }
    this.lfo.frequency.setValueAtTime(frequency, audioContext.currentTime);
    this.lfo.type = waveType;
  }

  componentWillUnmount() {
    this.lfo.stop();
  }

  changeFrequency = event =>
    this.setState({ frequency: Number.parseFloat(event.target.value) });

  changeWaveType = event => this.setState({ waveType: event.target.value });

  toggleBypassed = event => this.setState({ bypassed: !this.state.bypassed });

  render() {
    const { bypassed, frequency, waveType } = this.state;
    return (
      <div className="lfo">
        <div>Wave Type:</div>
        <select value={waveType} onChange={this.changeWaveType}>
          <option key={"lfoSineOption"} value="sine">
            Sine
          </option>
          <option key={"lfoSquareOption"} value="square">
            Square
          </option>
          <option key={"lfoSawtoothOption"} value="sawtooth">
            Sawtooth
          </option>
          <option key={"lfoTriangleOption"} value="triangle">
            Triangle
          </option>
        </select>
        <Range
          label="LFO"
          min="0.1"
          max="100"
          onChange={this.changeFrequency}
          output={frequency.toFixed(2)}
          step="0.1"
          value={frequency}
        />
        <div>Bypass:</div>
        <input
          type="checkbox"
          checked={bypassed}
          onChange={this.toggleBypassed}
        />
      </div>
    );
  }
}

export default LFO;
