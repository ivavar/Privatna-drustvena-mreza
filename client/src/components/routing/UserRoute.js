import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UserRoute = ({
  component: Component,
  auth: { loading, role },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !loading && role !== "user" ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

UserRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserRoute);
