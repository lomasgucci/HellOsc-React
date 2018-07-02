import React from "react";
import classNames from "classnames";

class WavePickerOption extends React.Component {
  state = {
    hover: false
  };

  changeHover = hover => this.setState({ hover });

  render() {
    const { children, className, displayName, value, onSelect } = this.props;
    const { hover } = this.state;
    return (
      <div className={classNames("wave-picker-option", className)}>
        <span className="wave-picker-option-display-name">{displayName}</span>
        {children && !hover && <span>></span>}
        {children && hover && <div>{children}</div>}
      </div>
    );
  }
}

export default WavePickerOption;
