import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerModulationRoute: null,
  updateModulationRouteSource: ["routeId", "source"],
  updateModulationRouteDestination: ["routeId", "destination"],
  updateModulationRouteDepth: ["routeId", "depth"],
  unregisterModulationRoute: ["routeId"]
});

export const ModulationRoutingConstants = Types;
export default Creators;
