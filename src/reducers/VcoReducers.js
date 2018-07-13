import { createReducer } from "reduxsauce";

import { VcoConstants } from "../actions/VcoActions";

const initialVcoState = {
  oscType: "sine",
  delay: 0,
  attack: 0,
  decay: 0,
  sustain: 1,
  release: 0.1,
  detune: 0,
  semitoneDetune: 0,
  pan: 0,
  gain: 1.0,
  bypassed: false,
  output: null
};

const RESET_STATE = {
  vco1: initialVcoState,
  vco2: initialVcoState,
  vco3: initialVcoState
};

const changeOscType = (state, { vcoId, oscType }) => {
  return { ...state, [vcoId]: { ...state[vcoId], oscType } };
};

const changeDelay = (state, { vcoId, delay }) => {
  delay = Number.parseFloat(delay);
  return { ...state, [vcoId]: { ...state[vcoId], delay } };
};

const changeAttack = (state, { vcoId, attack }) => {
  attack = Number.parseFloat(attack);
  return { ...state, [vcoId]: { ...state[vcoId], attack } };
};

const changeDecay = (state, { vcoId, decay }) => {
  decay = Number.parseFloat(decay);
  return { ...state, [vcoId]: { ...state[vcoId], decay } };
};

const changeSustain = (state, { vcoId, sustain }) => {
  sustain = Number.parseFloat(sustain);
  return { ...state, [vcoId]: { ...state[vcoId], sustain } };
};

const changeRelease = (state, { vcoId, release }) => {
  release = Number.parseFloat(release);
  return { ...state, [vcoId]: { ...state[vcoId], release } };
};

const changeDetune = (state, { vcoId, detune }) => {
  detune = Number.parseFloat(detune);
  return { ...state, [vcoId]: { ...state[vcoId], detune } };
};

const changeSemitoneDetune = (state, { vcoId, semitoneDetune }) => {
  semitoneDetune = Number.parseFloat(semitoneDetune);
  return { ...state, [vcoId]: { ...state[vcoId], semitoneDetune } };
};

const changePan = (state, { vcoId, pan }) => {
  pan = Number.parseFloat(pan);
  return { ...state, [vcoId]: { ...state[vcoId], pan } };
};

const changeGain = (state, { vcoId, gain }) => {
  gain = Number.parseFloat(gain);
  return { ...state, [vcoId]: { ...state[vcoId], gain } };
};

const changeVcoOutput = (state, { vcoId, output }) => {
  return { ...state, [vcoId]: { ...state[vcoId], output } };
};

const toggleBypassed = (state, { vcoId, bypassed }) => {
  return { ...state, [vcoId]: { ...state[vcoId], bypassed } };
};

const reset = () => RESET_STATE;

export default createReducer(RESET_STATE, {
  RESET: reset,
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
