import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const DashboardPosts = ({ auth: { user } }) => {
  return (
    <div className="dash-buttons">
      <div className="dash-posts">
        <Link to={`/profile-posts/${user._id}`}>
          <h2 className="my-2 text-dark">
            Moje objave <i className="fas fa-comment-alt" />
          </h2>
        </Link>
      </div>
    </div>
  );
};

DashboardPosts.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DashboardPosts);
