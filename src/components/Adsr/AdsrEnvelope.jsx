import React from "react";

class AdsrEnvelope extends React.Component {
  constructor(props) {
    super(props);
    const { audioContext } = this.props;
    this.envelope = audioContext.createConstantSource();
  }
}

export default AdsrEnvelope;
