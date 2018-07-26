import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import ModulationRouterRow from "./ModulationRouterRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import ModulationRoutingActions from "../../actions/ModulationRoutingActions";

class ModulationRouter extends React.Component {
  addRoute = () => {
    const { registerModulationRoute } = this.props;
    registerModulationRoute();
  };
  changeSource = (event, routeId) => {
    const { updateModulationRouteSource } = this.props;
    const source = event.target.value;
    updateModulationRouteSource(routeId, source);
  };
  changeDestination = (event, routeId) => {
    const {
      modDestinations,
      updateModulationRouteDestination,
      updateModulationRouteDepth
    } = this.props;
    const destination = event.target.value;
    const { maxDepth } = modDestinations[destination];
    updateModulationRouteDestination(routeId, destination);
    updateModulationRouteDepth(routeId, maxDepth);
  };
  changeDepth = (event, routeId) => {
    const { updateModulationRouteDepth } = this.props;
    const depth = event.target.value;
    updateModulationRouteDepth(routeId, depth);
  };
  removeRoute = routeId => {
    const { unregisterModulationRoute } = this.props;
    unregisterModulationRoute(routeId);
  };
  routeSort = (a, b) => {
    const { modSources } = this.props;
    const aSource = modSources[a.source]
      ? modSources[a.source].description
      : "";
    const bSource = modSources[b.source]
      ? modSources[b.source].description
      : "";
    return aSource === bSource ? 0 : aSource < bSource ? -1 : 1;
  };

  render() {
    const { modDestinations, modRoutes, modSources } = this.props;
    return (
      <div className="modulation-router">
        <Toolbar>
          <Typography variant="title">Modulation Routing</Typography>
          <Button color="primary" onClick={this.addRoute}>
            <i className="fas fa-plus button-icon-left" />Add a route
          </Button>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Depth</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(modRoutes)
              .sort(this.routeSort)
              .map(route => {
                console.log(route);
                const maxDepth = modDestinations[route.destination]
                  ? modDestinations[route.destination].maxDepth
                  : undefined;
                return (
                  <ModulationRouterRow
                    key={route.id}
                    sources={modSources}
                    source={route.source}
                    destinations={modDestinations}
                    destination={route.destination}
                    depth={route.depth}
                    maxDepth={maxDepth}
                    routeId={route.routeId}
                    changeSource={this.changeSource}
                    changeDestination={this.changeDestination}
                    changeDepth={this.changeDepth}
                    removeRoute={this.removeRoute}
                  />
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lfo: state.lfo,
    modDestinations: state.modDestinations,
    modRoutes: state.modRoutes,
    modSources: state.modSources
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ModulationRoutingActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModulationRouter);
