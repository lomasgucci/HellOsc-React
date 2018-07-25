import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function ModulationSelect(props) {
  const { options, value, onChange } = props;
  return (
    <Select value={value} onChange={onChange}>
      {options.map(option => (
        <MenuItem key={option.id} value={option.id}>
          {option.description}{" "}
        </MenuItem>
      ))}
    </Select>
  );
}

export default ModulationSelect;
