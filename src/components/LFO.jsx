import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Range from "./Range";

import ParamRoutingActions from "../actions/ParamRoutingActions";
import LfoActions from "../actions/LfoActions";

class LFO extends React.Component {
  componentDidMount() {
    const { audioContext, id } = this.props;
    const { frequency, waveType } = this.props.lfo[id];
    this.lfo = audioContext.createOscillator();
    this.lfo.frequency.value = frequency;
    this.lfo.type = waveType;
    this.lfo.start();
  }

  componentDidUpdate(prevProps, prevState) {
    const { audioContext, id } = this.props;
    const { bypassed, frequency, waveType } = this.props.lfo[id];
    this.lfo.frequency.setValueAtTime(frequency, audioContext.currentTime);
    this.lfo.type = waveType;
    if (!bypassed) {
      this.connectToOutputs();
    }
  }

  componentWillUnmount() {
    this.lfo.stop();
  }

  changeFrequency = event => {
    const { id, changeLfoFrequency } = this.props;
    changeLfoFrequency(id, event.target.value);
  };

  changeWaveType = event => {
    const { id, changeLfoWaveType } = this.props;
    changeLfoWaveType(id, event.target.value);
  };

  toggleBypassed = event => {
    const { id, toggleLfoBypassed } = this.props;
    const bypassed = event.target.checked;
    if (bypassed) {
      this.lfo.disconnect();
    } else {
      this.connectToOutputs();
    }
    toggleLfoBypassed(id, event.target.checked);
  };

  changeOutputs = event => {
    const { id, setLfoOutputs } = this.props;
    const selectedOptions = event.target.selectedOptions;
    const outputs = [];
    Object.values(selectedOptions).map(option => {
      outputs.push(option.value);
    });
    setLfoOutputs(id, outputs);
  };

  connectToOutputs = () => {
    const { id, paramRouting } = this.props;
    const { outputs } = this.props.lfo[id];
    this.lfo.disconnect();
    outputs.map(output => {
      this.lfo.connect(paramRouting[output].reference);
    });
  };

  render() {
    const { id, label, paramRouting } = this.props;
    const { bypassed, frequency, outputs, waveType } = this.props.lfo[id];
    return (
      <div className="lfo">
        <Typography variant="headline" gutterBottom>
          {label}
        </Typography>
        <div className="lfo-controls">
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
            label="Frequency"
            min="0.1"
            max="25"
            onChange={this.changeFrequency}
            output={frequency.toFixed(2) + "Hz"}
            step="0.1"
            value={frequency}
          />
          <div>Bypass:</div>
          <input
            type="checkbox"
            checked={bypassed}
            onChange={this.toggleBypassed}
          />
          <select onChange={this.changeOutputs} value={outputs} multiple>
            {Object.entries(paramRouting).map(([k, v]) => {
              return (
                <option value={k} key={"lfoOption" + k}>
                  {v.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { lfo: state.lfo, paramRouting: state.paramRouting };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...LfoActions, ...ParamRoutingActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LFO);
