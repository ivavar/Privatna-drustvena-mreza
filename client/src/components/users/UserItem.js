import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteUser, getUsers } from "../../actions/user";

const UserItem = ({
  deleteUser,
  user: {
    _id,
    name,
    surname,
    email,
  },
}) => (
  <Fragment>
    <div className="user bg-light">
      <h2>
        {name} {surname}
      </h2>
      <h3>{email}</h3>
      <div>
        <button
          title="Izbriši korisnika"
          onClick={() => deleteUser(_id)}
          type="button"
          className="btn btn-delete-user"
        >
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  </Fragment>
);

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { getUsers, deleteUser }
)(UserItem);
