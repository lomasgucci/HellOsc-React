import React from "react";
import Waves from "@mohayonao/wave-tables";

import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import SawtoothWaveIcon from "./icons/SawtoothWaveIcon";
import SineWaveIcon from "./icons/SineWaveIcon";
import SquareWaveIcon from "./icons/SquareWaveIcon";
import TriangleWaveIcon from "./icons/TriangleWaveIcon";

class WavePicker extends React.Component {
  state = {
    anchor: null,
    chromiumOpen: false,
    open: false
  };

  isChromiumWave() {
    const { value } = this.props;
    return (
      value !== "sine" &&
      value !== "sawtooth" &&
      value !== "square" &&
      value !== "triangle"
    );
  }

  toggleOpen = (event, open) => {
    if (open) {
      if (this.isChromiumWave()) {
        this.setState({
          anchor: event.currentTarget,
          chromiumOpen: true,
          open: false
        });
      } else {
        this.setState({
          anchor: event.currentTarget,
          chromiumOpen: false,
          open: true
        });
      }
    } else {
      this.setState({ anchor: null, chromiumOpen: false, open: false });
    }
  };

  toggleChromiumMenu = (event, open) => {
    if (event.currentTarget.id === "chromiumMenuBackButton") {
      this.setState({ chromiumOpen: false, open: true });
    } else {
      this.setState({ chromiumOpen: open, open: false });
    }
  };

  selectValue = wave => {
    const { id, onSelect } = this.props;
    onSelect(id, wave);
    if (this.isChromiumWave()) {
      this.toggleChromiumMenu({ currentTarget: "" }, false);
    } else {
      this.toggleOpen(null, false);
    }
  };

  render() {
    const { className, disabled, includeChromiumWaves, value } = this.props;
    const { anchor, chromiumOpen, open } = this.state;
    return (
      <div className={className}>
        <Button
          disabled={disabled}
          variant="flat"
          size="small"
          onClick={event => this.toggleOpen(event, true)}
        >
          {value === "sine" && <SineWaveIcon className="button-icon-left" />}
          {value === "triangle" && (
            <TriangleWaveIcon className="button-icon-left" />
          )}
          {value === "square" && (
            <SquareWaveIcon className="button-icon-left" />
          )}
          {value === "sawtooth" && (
            <SawtoothWaveIcon className="button-icon-left" />
          )}
          <span>{value}</span>
          <i className="fas fa-caret-down button-icon-right" />
        </Button>
        <Menu
          anchorEl={anchor}
          open={open}
          onClose={event => this.toggleOpen(event, false)}
        >
          <MenuItem
            onClick={() => this.selectValue("sine")}
            selected={value === "sine"}
          >
            <ListItemIcon>
              <SineWaveIcon />
            </ListItemIcon>
            <ListItemText primary="Sine" />
          </MenuItem>
          <MenuItem
            onClick={() => this.selectValue("sawtooth")}
            selected={value === "sawtooth"}
          >
            <ListItemIcon>
              <SawtoothWaveIcon />
            </ListItemIcon>
            <ListItemText primary="Sawtooth" />
          </MenuItem>
          <MenuItem
            onClick={() => this.selectValue("square")}
            selected={value === "square"}
          >
            <ListItemIcon>
              <SquareWaveIcon />
            </ListItemIcon>
            <ListItemText primary="Square" />
          </MenuItem>
          <MenuItem
            onClick={() => this.selectValue("triangle")}
            selected={value === "triangle"}
          >
            <ListItemIcon>
              <TriangleWaveIcon />
            </ListItemIcon>
            <ListItemText primary="Triangle" />
          </MenuItem>
          {includeChromiumWaves && (
            <MenuItem onClick={event => this.toggleChromiumMenu(event, true)}>
              <ListItemText primary="Chromium" />
              <ListItemIcon>
                <i className="fas fa-caret-right" />
              </ListItemIcon>
            </MenuItem>
          )}
        </Menu>
        {includeChromiumWaves && (
          <Menu
            anchorEl={anchor}
            open={chromiumOpen}
            onClose={event => this.toggleChromiumMenu(event, false)}
          >
            <MenuItem
              onClick={event => this.toggleChromiumMenu(event, false)}
              id="chromiumMenuBackButton"
            >
              <ListItemIcon>
                <i className="fas fa-caret-left" />
              </ListItemIcon>
              <ListItemText primary="Back" />
            </MenuItem>
            {Object.keys(Waves).map(wave => (
              <MenuItem
                key={wave}
                onClick={() => this.selectValue(wave)}
                selected={value === wave}
              >
                {wave}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
    );
  }
}

export default WavePicker;
