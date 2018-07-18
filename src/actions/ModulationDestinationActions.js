import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerModulationDestination: ["id", "description", "reference"]
});

export const ModulationDestinationConstants = Types;
export default Creators;
