import { createReducer } from "reduxsauce";

import { ParamRoutingConstants } from "../actions/ParamRoutingActions";

const registerParameter = (state, { id, description, reference }) => {
  return { ...state, [id]: { description, reference } };
};

const registerInputParameter = (state, { id, description, reference }) => {};

const unregisterInputParameter = (state, { id, reference }) => {};

export default createReducer(
  {},
  {
    [ParamRoutingConstants.REGISTER_PARAMETER]: registerParameter
  }
);
