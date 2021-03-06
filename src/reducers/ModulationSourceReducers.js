import { createReducer } from "reduxsauce";
import { ModulationSourceConstants } from "../actions/ModulationSourceActions";

const INITIAL_STATE = {};

const registerModulationSource = (state, { id, description, sourceType }) => {
  return { ...state, [id]: { id, description, sourceType } };
};

const unregisterModulationSource = (state, { id }) => {
  const newState = { ...state };
  delete newState[id];
  return newState;
};

export default createReducer(INITIAL_STATE, {
  [ModulationSourceConstants.REGISTER_MODULATION_SOURCE]: registerModulationSource,
  [ModulationSourceConstants.UNREGISTER_MODULATION_SOURCE]: unregisterModulationSource
});
