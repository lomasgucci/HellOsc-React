import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function ModulationSelect(props) {
  const { destinations, destination, source, sources, onChange } = props;
  let filteredDestinations = [];
  const sourceObj = sources[source];
  if (source && sourceObj.sourceType === "modulation") {
    filteredDestinations = Object.values(destinations).filter(
      dest =>
        dest.destinationType === "param" ||
        dest.destinationType === "voiceParam"
    );
  } else if (source && sourceObj.sourceType === "output") {
    filteredDestinations = Object.values(destinations).filter(
      dest => dest.destinationType === "input"
    );
  }
  return (
    <Select value={destination} onChange={onChange}>
      {filteredDestinations.map(option => (
        <MenuItem key={option.id} value={option.id}>
          {option.description}{" "}
        </MenuItem>
      ))}
    </Select>
  );
}

export default ModulationSelect;
