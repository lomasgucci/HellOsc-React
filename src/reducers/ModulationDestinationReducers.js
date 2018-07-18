import { createReducer } from "reduxsauce";
import { ModulationDestinationConstants } from "../actions/ModulationDestinationActions";

const INITIAL_STATE = {};

const registerModulationDestination = (state, { id, description }) => {
  return { ...state, [id]: description };
};

export default createReducer(INITIAL_STATE, {
  [ModulationDestinationConstants.REGISTER_MODULATION_DESTINATION]: registerModulationDestination
});
