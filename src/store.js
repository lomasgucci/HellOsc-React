import { combineReducers, createStore } from "redux";
import { resettableReducer } from "reduxsauce";

import lfoReducers from "./reducers/LfoReducers";
import modulationDestinationRouters from "./reducers/ModulationDestinationReducers";
import modulationRoutingReducers from "./reducers/ModulationRoutingReducers";
import modulationSourceReducers from "./reducers/ModulationSourceReducers";
import vcoReducers from "./reducers/VcoReducers";
import voiceReducers from "./reducers/VoiceReducers";

const resettable = resettableReducer("RESET");

const allReducers = combineReducers({
  lfo: resettable(lfoReducers),
  modDestinations: modulationDestinationRouters,
  modRoutes: resettable(modulationRoutingReducers),
  modSources: modulationSourceReducers,
  vco: resettable(vcoReducers),
  voices: voiceReducers
});

export default createStore(
  allReducers,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
