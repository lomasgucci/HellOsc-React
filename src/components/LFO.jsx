import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Range from "./Range";
import SineWaveIcon from "./icons/SineWaveIcon";
import WavePicker from "./WavePicker";

import ParamRoutingActions from "../actions/ParamRoutingActions";
import LfoActions from "../actions/LfoActions";

class LFO extends React.Component {
  constructor(props) {
    super(props);
    const { audioContext, id, masterGainLevel } = this.props;
    const { delay, frequency, waveType } = this.props.lfo[id];
    this.lfo = audioContext.createOscillator();
    this.lfoDelay = audioContext.createDelay(5);
    this.lfoAmplitude = audioContext.createGain();
    this.lfo.frequency.value = frequency;
    this.lfo.type = waveType;
    this.lfoDelay.delayTime.value = delay;
    this.lfoAmplitude.gain.value = masterGainLevel;
  }

  componentDidMount() {
    this.lfo.start();
    this.lfo.connect(this.lfoDelay).connect(this.lfoAmplitude);
  }

  componentDidUpdate(prevProps, prevState) {
    const { audioContext, id } = this.props;
    const { bypassed, delay, frequency, waveType } = this.props.lfo[id];
    const now = audioContext.currentTime;
    this.lfo.frequency.setValueAtTime(frequency, now);
    this.lfoDelay.delayTime.setValueAtTime(delay, now);
    this.lfo.type = waveType;
    if (!bypassed) {
      this.connectToOutputs();
    }
  }

  componentWillUnmount() {
    this.lfo.stop();
  }

  changeDelay = event => {
    const { id, changeLfoDelay } = this.props;
    changeLfoDelay(id, event.target.valueAsNumber);
  };

  changeFrequency = event => {
    const { id, changeLfoFrequency } = this.props;
    changeLfoFrequency(id, event.target.valueAsNumber);
  };

  changeWaveType = (id, waveType) => {
    const { changeLfoWaveType } = this.props;
    changeLfoWaveType(id, waveType);
  };

  toggleBypassed = (event, checked) => {
    const { id, toggleLfoBypassed } = this.props;
    const bypassed = !checked;
    console.log(checked, bypassed);
    if (bypassed) {
      this.lfoAmplitude.disconnect();
    } else {
      this.connectToOutputs();
    }
    toggleLfoBypassed(id, bypassed);
  };

  changeOutputs = (event, values) => {
    const { id, setLfoOutputs } = this.props;
    const selectedOptions = event.target.selectedOptions;
    const outputs = Object.values(selectedOptions).map(option => option.value);
    setLfoOutputs(id, outputs);
  };

  connectToOutputs = () => {
    const { id, paramRouting, voices } = this.props;
    const { outputs } = this.props.lfo[id];
    this.lfoAmplitude.disconnect();
    outputs.map(output => {
      const { reference } = paramRouting[output];
      if (reference === null) {
        if (voices["vco1"] !== undefined) {
          voices["vco1"].map(voice => {
            this.lfoAmplitude.gain.value = voice.frequency.value * 2;
            this.lfoAmplitude.connect(voice.frequency);
          });
        }
      } else {
        this.lfoAmplitude.gain.value = 1;
        this.lfoAmplitude.connect(paramRouting[output].reference);
      }
    });
  };

  close = () => {
    const { id, removeLfo } = this.props;
    removeLfo(id);
  };

  render() {
    const { id, paramRouting } = this.props;
    const { bypassed, delay, frequency, outputs, waveType } = this.props.lfo[
      id
    ];
    return (
      <div className="lfo">
        <Typography variant="headline" gutterBottom>
          <SineWaveIcon /> LFO
        </Typography>
        <div className="lfo-controls">
          <Checkbox
            icon={<i className="fal fa-power-off" />}
            checkedIcon={<i className="fas fa-power-off" />}
            checked={!bypassed}
            onChange={this.toggleBypassed}
          />
          <WavePicker id={id} onSelect={this.changeWaveType} value={waveType} />
          <Range
            label="Frequency"
            min="0.01"
            max="25"
            onChange={this.changeFrequency}
            output={frequency.toFixed(2) + "Hz"}
            step="0.01"
            value={frequency}
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
          <IconButton onClick={this.close}>
            <i className="fal fa-times" />
          </IconButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lfo: state.lfo,
    paramRouting: state.paramRouting,
    voices: state.voices
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...LfoActions, ...ParamRoutingActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LFO);
