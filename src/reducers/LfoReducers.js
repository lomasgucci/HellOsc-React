import { createReducer } from "reduxsauce";

import { LfoConstants } from "../actions/LfoActions";

const initialLfoState = {
  outputs: [],
  waveType: "sine",
  frequency: 2.0,
  delay: 0.0,
  bypassed: false
};

const INITIAL_STATE = {};

const getIdentifier = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

const createLfo = state => {
  const id = getIdentifier();
  return {
    ...state,
    [id]: { ...initialLfoState }
  };
};

const removeLfo = (state, { lfoId }) => {
  const newState = { ...state };
  delete newState[lfoId];
  return newState;
};

const setLfoOutputs = (state, { lfoId, outputs }) => {
  return { ...state, [lfoId]: { ...state[lfoId], outputs } };
};

const changeLfoWaveType = (state, { lfoId, waveType }) => {
  return { ...state, [lfoId]: { ...state[lfoId], waveType } };
};

const changeLfoFrequency = (state, { lfoId, frequency }) => {
  return { ...state, [lfoId]: { ...state[lfoId], frequency } };
};

const changeLfoDelay = (state, { lfoId, delay }) => {
  return { ...state, [lfoId]: { ...state[lfoId], delay } };
};

const toggleLfoBypassed = (state, { lfoId, bypassed }) => {
  return { ...state, [lfoId]: { ...state[lfoId], bypassed } };
};

export default createReducer(INITIAL_STATE, {
  [LfoConstants.CREATE_LFO]: createLfo,
  [LfoConstants.REMOVE_LFO]: removeLfo,
  [LfoConstants.SET_LFO_OUTPUTS]: setLfoOutputs,
  [LfoConstants.CHANGE_LFO_WAVE_TYPE]: changeLfoWaveType,
  [LfoConstants.CHANGE_LFO_FREQUENCY]: changeLfoFrequency,
  [LfoConstants.CHANGE_LFO_DELAY]: changeLfoDelay,
  [LfoConstants.TOGGLE_LFO_BYPASSED]: toggleLfoBypassed
});
