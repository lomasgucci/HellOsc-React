import React from "react";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SineWaveIcon from "./icons/SineWaveIcon";

class EffectsMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  addLfo = event => {
    const { createLfo } = this.props;
    createLfo();
    this.toggleMenu(event);
  };

  toggleMenu = event =>
    this.setState({ anchorEl: event.currentTarget, open: !this.state.open });

  render() {
    const { anchorEl, open } = this.state;
    return (
      <div>
        <Button onClick={this.toggleMenu}>
          <i className="fas fa-plus button-icon-left" />
          Add an effect
        </Button>
        <Menu open={open} anchorEl={anchorEl} onClose={this.toggleMenu}>
          <MenuItem onClick={this.addLfo}>
            <SineWaveIcon /> LFO
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default EffectsMenu;
