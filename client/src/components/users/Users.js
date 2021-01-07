import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import UserItem from "../users/UserItem";
import { getUsers } from "../../actions/user";

const Users = ({ getUsers, user: { users, loading } }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Korisnici</h1>
      <div>
        {users.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
