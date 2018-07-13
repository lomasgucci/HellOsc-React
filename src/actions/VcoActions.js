import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  changeOscType: ["vcoId", "oscType"],
  changeDelay: ["vcoId", "delay"],
  changeAttack: ["vcoId", "attack"],
  changeDecay: ["vcoId", "decay"],
  changeSustain: ["vcoId", "sustain"],
  changeRelease: ["vcoId", "release"],
  changeDetune: ["vcoId", "detune"],
  changeSemitoneDetune: ["vcoId", "semitoneDetune"],
  changePan: ["vcoId", "pan"],
  changeGain: ["vcoId", "gain"],
  changeVcoOutput: ["vcoId", "output"],
  toggleBypassed: ["vcoId", "bypassed"]
});

export const VcoConstants = Types;
export default Creators;
