import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerModulationSource: ["id", "description", "modType"],
  unregisterModulationSource: ["id"]
});

export const ModulationSourceConstants = Types;
export default Creators;
