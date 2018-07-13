import { createReducer } from "reduxsauce";

import { LfoConstants } from "../actions/LfoActions";

const initialLfoState = {
  outputs: [],
  waveType: "sine",
  frequency: 2.0,
  bypassed: false
};

const INITIAL_STATE = {
  lfo1: initialLfoState,
  lfo2: initialLfoState
};

const setLfoOutputs = (state, { lfoId, outputs }) => {
  return { ...state, [lfoId]: { ...state[lfoId], outputs } };
};

const changeLfoWaveType = (state, { lfoId, waveType }) => {
  return { ...state, [lfoId]: { ...state[lfoId], waveType } };
};

const changeLfoFrequency = (state, { lfoId, frequency }) => {
  frequency = Number.parseFloat(frequency);
  return { ...state, [lfoId]: { ...state[lfoId], frequency } };
};

const toggleLfoBypassed = (state, { lfoId, bypassed }) => {
  return { ...state, [lfoId]: { ...state[lfoId], bypassed } };
};

export default createReducer(INITIAL_STATE, {
  [LfoConstants.SET_LFO_OUTPUTS]: setLfoOutputs,
  [LfoConstants.CHANGE_LFO_WAVE_TYPE]: changeLfoWaveType,
  [LfoConstants.CHANGE_LFO_FREQUENCY]: changeLfoFrequency,
  [LfoConstants.TOGGLE_LFO_BYPASSED]: toggleLfoBypassed
});
