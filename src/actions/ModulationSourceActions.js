import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerModulationSource: ["id", "description"]
});

export const ModulationSourceConstants = Types;
export default Creators;
