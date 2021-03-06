import { createReducer } from "reduxsauce";
import { ModulationRoutingConstants } from "../actions/ModulationRoutingActions";
import { getIdentifier } from "../utils";

const INITIAL_STATE = {};

const registerModulationRoute = state => {
  const routeId = getIdentifier();
  return {
    ...state,
    [routeId]: { routeId }
  };
};

const createRoute = (state, { source, destination }) => {
  const routeId = getIdentifier();
  return {
    ...state,
    [routeId]: { routeId, source, destination }
  };
};

const updateModulationRouteSource = (state, { routeId, source }) => {
  return {
    ...state,
    [routeId]: { ...state[routeId], source }
  };
};

const updateModulationRouteDestination = (state, { routeId, destination }) => {
  return {
    ...state,
    [routeId]: { ...state[routeId], destination, depth: 0 }
  };
};

const updateModulationRouteDepth = (state, { routeId, depth }) => {
  return {
    ...state,
    [routeId]: { ...state[routeId], depth }
  };
};

const unregisterModulationRoute = (state, { routeId }) => {
  const newState = { ...state };
  delete newState[routeId];
  return newState;
};

export default createReducer(INITIAL_STATE, {
  [ModulationRoutingConstants.REGISTER_MODULATION_ROUTE]: registerModulationRoute,
  [ModulationRoutingConstants.CREATE_ROUTE]: createRoute,
  [ModulationRoutingConstants.UPDATE_MODULATION_ROUTE_SOURCE]: updateModulationRouteSource,
  [ModulationRoutingConstants.UPDATE_MODULATION_ROUTE_DESTINATION]: updateModulationRouteDestination,
  [ModulationRoutingConstants.UPDATE_MODULATION_ROUTE_DEPTH]: updateModulationRouteDepth,
  [ModulationRoutingConstants.UNREGISTER_MODULATION_ROUTE]: unregisterModulationRoute
});
