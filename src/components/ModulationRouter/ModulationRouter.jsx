import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ModulationRouterRow from "./ModulationRouterRow";
import Range from "../Range";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
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
    const { updateModulationRouteDestination } = this.props;
    const destination = event.target.value;
    updateModulationRouteDestination(routeId, destination);
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
  render() {
    const { modDestinations, modRoutes, modSources } = this.props;
    const sources = Object.values(modSources);
    const destinations = Object.values(modDestinations);
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
            {Object.values(modRoutes).map(route => {
              const maxDepth = modDestinations[route.destination]
                ? modDestinations[route.destination].maxDepth
                : 1;
              return (
                <ModulationRouterRow
                  key={route.id}
                  sources={sources}
                  source={route.source}
                  destinations={destinations}
                  destination={route.destination}
                  depth={route.depth}
                  maxDepth={maxDepth}
                  routeId={route.id}
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
