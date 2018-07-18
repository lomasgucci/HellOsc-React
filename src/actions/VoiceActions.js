import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  registerVoice: ["vcoId", "voice"],
  unregisterVoice: ["vcoId", "voice"]
});

export const VoiceConstants = Types;
export default Creators;
