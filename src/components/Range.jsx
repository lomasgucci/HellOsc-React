import React from "react";
import classNames from "classnames";
import Slider from "@material-ui/lab/Slider";
import { Knob } from "react-rotary-knob";
import TextField from "@material-ui/core/TextField";

function Range(props) {
  const { label, max, min, step, value, onChange, output, disabled } = props;

  return (
    <div className="range">
      <TextField
        className="range-field"
        disabled={true}
        label={label}
        value={output}
        onChange={onChange}
        fullWidth={false}
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{ margin: "dense", fullWidth: false, min, max, step }}
        margin="dense"
      />
      <Knob
        min={min}
        max={max}
        unlockDistance={50}
        value={value}
        onChange={onChange}
        // disabled={disabled}
      />
    </div>
  );
}

export default Range;
