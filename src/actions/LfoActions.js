import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  createLfo: null,
  removeLfo: ["lfoId"],
  setLfoOutputs: ["lfoId", "outputs"],
  changeLfoWaveType: ["lfoId", "waveType"],
  changeLfoFrequency: ["lfoId", "frequency"],
  changeLfoDelay: ["lfoId", "delay"],
  toggleLfoBypassed: ["lfoId", "bypassed"]
});

export const LfoConstants = Types;
export default Creators;
