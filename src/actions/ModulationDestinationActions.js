import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerModulationDestination: [
    "paramId",
    "description",
    "reference",
    "maxDepth",
    "destinationType"
  ]
});

export const ModulationDestinationConstants = Types;
export default Creators;
