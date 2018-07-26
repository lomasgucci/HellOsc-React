import { createReducer } from "reduxsauce";
import { ModulationDestinationConstants } from "../actions/ModulationDestinationActions";
import { getIdentifier } from "../utils";

const INITIAL_STATE = {};

const registerModulationDestination = (
  state,
  { paramId, description, reference, maxDepth, destinationType }
) => {
  const id = getIdentifier();
  return {
    ...state,
    [id]: { id, paramId, description, reference, maxDepth, destinationType }
  };
};

export default createReducer(INITIAL_STATE, {
  [ModulationDestinationConstants.REGISTER_MODULATION_DESTINATION]: registerModulationDestination
});
