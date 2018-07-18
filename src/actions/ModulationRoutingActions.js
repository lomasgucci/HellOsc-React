import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerModulationRoute: ["sourceId", "destinationId"],
  unregisterModulationRouter: ["sourceId", "destinationId"]
});

export const ModulationRoutingConstants = Types;
export default Creators;
