import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function SourceSelect(props) {
  const { sources, source, onChange } = props;
  return (
    <Select value={source} onChange={onChange}>
      {Object.values(sources).map(option => (
        <MenuItem key={option.id} value={option.id}>
          {option.description}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SourceSelect;
