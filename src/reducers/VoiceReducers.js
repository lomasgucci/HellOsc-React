import { createReducer } from "reduxsauce";

import { VoiceConstants } from "../actions/VoiceActions";

const INITIAL_STATE = {};

const registerVoice = (state, { vcoId, voice }) => {
  const newState = { ...state };
  if (newState[vcoId] === undefined) {
    newState[vcoId] = [];
  }
  newState[vcoId].push(voice);
  return newState;
};

const unregisterVoice = (state, { vcoId, voice }) => {
  const newState = { ...state };
  const index = newState[vcoId].findIndex(item => item === voice);
  newState[vcoId].splice(index, 1);
  return newState;
};

export default createReducer(INITIAL_STATE, {
  [VoiceConstants.REGISTER_VOICE]: registerVoice,
  [VoiceConstants.UNREGISTER_VOICE]: unregisterVoice
});
