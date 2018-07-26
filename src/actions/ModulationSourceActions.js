import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerModulationSource: ["id", "description", "sourceType"],
  unregisterModulationSource: ["id"]
});

export const ModulationSourceConstants = Types;
export default Creators;
