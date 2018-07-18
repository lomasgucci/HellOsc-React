import { createReducer } from "reduxsauce";
import { ModulationRoutingConstants } from "../actions/ModulationRoutingActions";

const INITIAL_STATE = {};

const registerModulationRoute = (state, { id, description }) => {
  return { ...state, [id]: description };
};

export default createReducer(INITIAL_STATE, {
  [ModulationRoutingConstants.REGISTER_MODULATION_ROUTE]: registerModulationRoute
});
