import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerParameter: ["id", "description", "reference"]
});

export const ParamRoutingConstants = Types;

export default Creators;