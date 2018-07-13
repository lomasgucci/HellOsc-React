import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  setLfoOutputs: ["lfoId", "outputs"],
  changeLfoWaveType: ["lfoId", "waveType"],
  changeLfoFrequency: ["lfoId", "frequency"],
  toggleLfoBypassed: ["lfoId", "bypassed"]
});

export const LfoConstants = Types;
export default Creators;
