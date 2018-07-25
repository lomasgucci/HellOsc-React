import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SineWaveIcon from "./icons/SineWaveIcon";

import LfoActions from "../actions/LfoActions";
import ModulationSourceActions from "../actions/ModulationSourceActions";

class EffectsMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  getIdentifier = () =>
    Math.random()
      .toString(36)
      .substr(2, 9);

  addLfo = event => {
    const { createLfo } = this.props;
    const id = this.getIdentifier();
    createLfo(id);
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

const mapStateToProps = state => {
  return {
    lfo: state.lfo
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...LfoActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EffectsMenu);
