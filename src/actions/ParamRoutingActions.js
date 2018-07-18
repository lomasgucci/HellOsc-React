import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerParameter: ["id", "description", "reference"],
  registerInputParameter: ["id", "reference"],
  unregisterInputParameter: ["id", "reference"]
});

export const ParamRoutingConstants = Types;

export default Creators;
