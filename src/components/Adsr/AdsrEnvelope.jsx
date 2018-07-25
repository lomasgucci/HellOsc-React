import React from "react";

class AdsrEnvelope extends React.Component {
  constructor(props) {
    super(props);
    const {
      id,
      delay,
      attack,
      audioContext,
      decay,
      sustain,
      release
    } = this.props;
  }
}

export default AdsrEnvelope;
