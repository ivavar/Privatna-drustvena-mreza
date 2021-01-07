import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import { getProfilesPosts } from "../../actions/post";
import { getProfileById } from "../../actions/profile";

const ProfilePosts = ({
  getProfilesPosts,
  post: { posts, loading },
  match,
}) => {
  useEffect(() => {
    getProfilesPosts(match.params.id);
  }, [getProfilesPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Objave</h1>
      {posts.length > 0 ? (
        <div className="post-content">
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <h3> Nema objava...</h3>
      )}
    </Fragment>
  );
};

ProfilePosts.propTypes = {
  getProfilesPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProfilesPosts,
  getProfileById
})(ProfilePosts);
