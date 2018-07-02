import React from "react";

function DecibalMeter(props) {
  const { audioContext, source } = props;
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  const bufferLength = analyser.frequencyBinCount;
  const timeData = new Float32Array(bufferLength);
  const freqData = new Float32Array(bufferLength);
  analyser.getFloatTimeDomainData(timeData);
  analyser.getFloatFrequencyData(freqData);
  console.log(timeData, freqData);
  return null;
}

export default DecibalMeter;
