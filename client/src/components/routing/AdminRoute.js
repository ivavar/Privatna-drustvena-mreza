import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AdminRoute = ({
  component: Component,
  auth: { loading, role },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !loading && role !== "admin" ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
