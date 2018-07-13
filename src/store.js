import { combineReducers, createStore } from "redux";

import lfoReducers from "./reducers/LfoReducers";
import paramReduceres from "./reducers/ParamRoutingReducers";
import vcoReducers from "./reducers/VcoReducers";

const allReducers = combineReducers({
  lfo: lfoReducers,
  paramRouting: paramReduceres,
  vco: vcoReducers
});

export default createStore(
  allReducers,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
