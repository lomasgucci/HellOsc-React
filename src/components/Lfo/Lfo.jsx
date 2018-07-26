import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Range from "../Range";
import SineWaveIcon from "../icons/SineWaveIcon";
import WavePicker from "../WavePicker";

import ModulationSourceActions from "../../actions/ModulationSourceActions";
import LfoActions from "../../actions/LfoActions";

class Lfo extends React.Component {
  constructor(props) {
    super(props);
    const { audioContext, id, registerModulationSource } = this.props;
    const { description, frequency, waveType } = this.props.lfo[id];
    this.lfo = audioContext.createOscillator();
    this.lfoConnections = [];
    this.lfo.frequency.value = frequency;
    this.lfo.type = waveType;

    registerModulationSource(id, description, "modulation");
  }

  componentDidMount() {
    this.lfo.start();
  }

  componentDidUpdate(prevProps, prevState) {
    const { audioContext, id } = this.props;
    const { bypassed, frequency, waveType } = this.props.lfo[id];
    const now = audioContext.currentTime;
    this.lfo.frequency.setValueAtTime(frequency, now);
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
    changeLfoFrequency(id, event.target.valueAsNumber);
  };

  changeWaveType = (id, waveType) => {
    const { changeLfoWaveType } = this.props;
    changeLfoWaveType(id, waveType);
  };

  changeDelay = event => {
    const { id, changeLfoDelay } = this.props;
    changeLfoDelay(id, event.target.valueAsNumber);
  };

  toggleBypassed = (event, checked) => {
    const { id, toggleLfoBypassed } = this.props;
    const bypassed = !checked;
    if (bypassed) {
      this.lfoAmplitude.disconnect();
    } else {
      this.connectToOutputs();
    }
    toggleLfoBypassed(id, bypassed);
  };

  connectToOutputs = () => {
    const { id, modRoutes } = this.props;
    this.disconnectAllConnections();
    Object.values(modRoutes)
      .filter(route => route.source === id && route.destination !== undefined)
      .forEach(this.connectRoute);
  };

  connectRoute = route => {
    const { modDestinations, voices } = this.props;
    const { destinationType, paramId } = modDestinations[route.destination];

    if (destinationType === "voiceParam" && voices[paramId] !== undefined) {
      voices[paramId].forEach(voice =>
        this.connectToVoiceParameters(route, voice)
      );
    } else if (destinationType === "param") {
      this.connectToVcoParameters(route);
    }
  };

  connectToVoiceParameters = (route, voice) => {
    const { audioContext, id, voices, modDestinations } = this.props;
    const { delay } = this.props.lfo[id];
    const { reference, paramId } = modDestinations[route.destination];
    voices[paramId].forEach(voice => {
      const lfoAmplitude = audioContext.createGain();
      const value =
        modDestinations[route.destination].maxDepth === 36
          ? voice[reference].value * (route.depth / 12)
          : route.depth;
      lfoAmplitude.gain.setValueAtTime(value, audioContext.currentTime);
      this.lfo.connect(lfoAmplitude);
      setTimeout(() => lfoAmplitude.connect(voice[reference]), delay * 1000);
      this.lfoConnections.push(lfoAmplitude);
    });
  };

  connectToVcoParameters = route => {
    const { audioContext, id, modDestinations } = this.props;
    const { reference } = modDestinations[route.destination];
    const { delay } = this.props.lfo[id];
    const lfoAmplitude = audioContext.createGain();
    lfoAmplitude.gain.setValueAtTime(route.depth, audioContext.currentTime);
    this.lfo.connect(lfoAmplitude);
    setTimeout(() => lfoAmplitude.connect(reference), delay * 1000);
    this.lfoConnections.push(lfoAmplitude);
  };

  disconnectAllConnections = () => {
    this.lfo.disconnect();
    this.lfoConnections.map(connection => connection.disconnect());
    this.lfoConnections = [];
  };

  close = () => {
    const { id, removeLfo, unregisterModulationSource } = this.props;
    unregisterModulationSource(id);
    removeLfo(id);
  };

  render() {
    const { id } = this.props;
    const {
      bypassed,
      description,
      delay,
      frequency,
      waveType
    } = this.props.lfo[id];
    return (
      <div className="lfo">
        <Typography variant="headline" gutterBottom>
          <SineWaveIcon /> {description}
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
            label="Delay"
            min={0}
            max={5}
            step={0.001}
            value={delay}
            onChange={this.changeDelay}
            output={delay.toFixed(3) + "s"}
          />
          <Range
            label="Frequency"
            min="0.01"
            max="25"
            onChange={this.changeFrequency}
            output={frequency.toFixed(2) + "Hz"}
            step="0.01"
            value={frequency}
          />
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
    modDestinations: state.modDestinations,
    modRoutes: state.modRoutes,
    voices: state.voices
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...LfoActions, ...ModulationSourceActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lfo);
