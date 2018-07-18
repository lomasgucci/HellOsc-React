import React from "react";

class ParameterCircle extends React.Component {
  onHoverOverPoints = event => {
    const { radius } = this.props;
    event.target.setAttribute("r", radius * 2);
  };

  onHoverOffPoints = event => {
    const { radius } = this.props;
    event.target.setAttribute("r", radius);
  };

  onDrag = event => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;
    console.log(event.target, event.currentTarget);
    console.log(left, top, clientX, clientY);
  };
  render() {
    const { x, y, radius } = this.props;
    return (
      <circle
        cx={x}
        cy={y}
        r={radius}
        onMouseOver={this.onHoverOverPoints}
        onMouseOut={this.onHoverOffPoints}
        onMouseDown={this.onDrag}
      />
    );
  }
}

export default ParameterCircle;
