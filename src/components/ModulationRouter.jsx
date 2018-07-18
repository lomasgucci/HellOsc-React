import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ModulationRoutingActions from "../actions/ModulationRoutingActions";

function ModulationRouter(props) {
  console.log(props);
  return <div>Router</div>;
}

const mapStateToProps = state => {
  return {
    modDestinations: state.modDestinations,
    modRoutes: state.modRoutes,
    modSources: state.modSources
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ModulationRoutingActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModulationRouter);
