import { createReducer } from "reduxsauce";
import { ModulationSourceConstants } from "../actions/ModulationSourceActions";

const INITIAL_STATE = {};

const registerModulationSource = (state, { id, description }) => {
  return { ...state, [id]: description };
};

export default createReducer(INITIAL_STATE, {
  [ModulationSourceConstants.REGISTER_MODULATION_SOURCE]: registerModulationSource
});
