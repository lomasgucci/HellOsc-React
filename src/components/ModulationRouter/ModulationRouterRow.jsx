import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ModulationSelect from "./ModulationSelect";
import Range from "../Range";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function ModulationRouterRow(props) {
  const {
    destination,
    destinations,
    source,
    sources,
    depth,
    maxDepth,
    routeId,
    changeDestination,
    changeSource,
    changeDepth,
    removeRoute
  } = props;
  const step = maxDepth > 1 ? 1 : 0.01;
  return (
    <TableRow>
      <TableCell>
        <ModulationSelect
          value={source}
          options={sources}
          onChange={event => changeSource(event, routeId)}
        />
      </TableCell>
      <TableCell>
        <ModulationSelect
          value={destination}
          options={destinations}
          onChange={event => changeDestination(event, routeId)}
        />
      </TableCell>
      <TableCell>
        <Range
          step={step}
          min={maxDepth * -1}
          max={maxDepth}
          value={depth}
          onChange={event => changeDepth(event, routeId)}
          output={depth}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => removeRoute(routeId)}>
          <i className="fas fa-times" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default ModulationRouterRow;
