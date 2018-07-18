import { createReducer } from "reduxsauce";

import { VcoConstants } from "../actions/VcoActions";

const initialVcoState = {
  oscType: "sine",
  delay: 0.0,
  attack: 0.0,
  decay: 0.0,
  sustain: 1.0,
  release: 0.1,
  detune: 0.0,
  semitoneDetune: 0.0,
  pan: 0.0,
  gain: 1.0,
  bypassed: false,
  output: null
};

const INITIAL_STATE = {
  vco1: initialVcoState,
  vco2: initialVcoState,
  vco3: initialVcoState
};

const changeOscType = (state, { vcoId, oscType }) => {
  return { ...state, [vcoId]: { ...state[vcoId], oscType } };
};

const changeDelay = (state, { vcoId, delay }) => {
  return { ...state, [vcoId]: { ...state[vcoId], delay } };
};

const changeAttack = (state, { vcoId, attack }) => {
  return { ...state, [vcoId]: { ...state[vcoId], attack } };
};

const changeDecay = (state, { vcoId, decay }) => {
  return { ...state, [vcoId]: { ...state[vcoId], decay } };
};

const changeSustain = (state, { vcoId, sustain }) => {
  return { ...state, [vcoId]: { ...state[vcoId], sustain } };
};

const changeRelease = (state, { vcoId, release }) => {
  return { ...state, [vcoId]: { ...state[vcoId], release } };
};

const changeDetune = (state, { vcoId, detune }) => {
  return { ...state, [vcoId]: { ...state[vcoId], detune } };
};

const changeSemitoneDetune = (state, { vcoId, semitoneDetune }) => {
  return { ...state, [vcoId]: { ...state[vcoId], semitoneDetune } };
};

const changePan = (state, { vcoId, pan }) => {
  return { ...state, [vcoId]: { ...state[vcoId], pan } };
};

const changeGain = (state, { vcoId, gain }) => {
  return { ...state, [vcoId]: { ...state[vcoId], gain } };
};

const changeVcoOutput = (state, { vcoId, output }) => {
  return { ...state, [vcoId]: { ...state[vcoId], output } };
};

const toggleBypassed = (state, { vcoId }) => {
  return {
    ...state,
    [vcoId]: { ...state[vcoId], bypassed: !state[vcoId].bypassed }
  };
};

export default createReducer(INITIAL_STATE, {
  [VcoConstants.CHANGE_OSC_TYPE]: changeOscType,
  [VcoConstants.CHANGE_DELAY]: changeDelay,
  [VcoConstants.CHANGE_ATTACK]: changeAttack,
  [VcoConstants.CHANGE_DECAY]: changeDecay,
  [VcoConstants.CHANGE_SUSTAIN]: changeSustain,
  [VcoConstants.CHANGE_RELEASE]: changeRelease,
  [VcoConstants.CHANGE_DETUNE]: changeDetune,
  [VcoConstants.CHANGE_SEMITONE_DETUNE]: changeSemitoneDetune,
  [VcoConstants.CHANGE_PAN]: changePan,
  [VcoConstants.CHANGE_GAIN]: changeGain,
  [VcoConstants.CHANGE_VCO_OUTPUT]: changeVcoOutput,
  [VcoConstants.TOGGLE_BYPASSED]: toggleBypassed
});
