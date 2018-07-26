import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DestinationSelect from "./DestinationSelect";
import SourceSelect from "./SourceSelect";
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
        <SourceSelect
          source={source}
          sources={sources}
          onChange={event => changeSource(event, routeId)}
        />
      </TableCell>
      <TableCell>
        <DestinationSelect
          destination={destination}
          destinations={destinations}
          source={source}
          sources={sources}
          onChange={event => changeDestination(event, routeId)}
        />
      </TableCell>
      <TableCell>
        {depth && (
          <Range
            step={step}
            min={maxDepth * -1}
            max={maxDepth}
            value={depth}
            onChange={event => changeDepth(event, routeId)}
            output={depth}
          />
        )}
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
