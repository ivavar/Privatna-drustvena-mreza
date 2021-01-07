import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

function GetFilename(url) {
  let type = url.split(".").pop();
  if (url) {
    var m = url.toString().match(/.*\/(.+?)\./);
    if (m && m.length > 1) {
      return m[1] + "." + type;
    }
  }
  return "";
}

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    name,
    surname,
    avatar,
    picture,
    user,
    likes,
    comments,
    date,
    fileURL,
  },
  showActions,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
          className="round-img"
          src={picture === "" ? avatar : picture}
          alt=""
        />
        <h4>
          {name} {surname}
        </h4>
      </Link>
    </div>
    <div className="post-content">
      <p className="my-1">{text}</p>
      {fileURL && (
        <a href={fileURL}>
          {GetFilename(fileURL)}
          <object width="100%" height="500px" data={fileURL}>
            {" "}
          </object>
        </a>
      )}

      {showActions && (
        <Fragment>
          <div className="div-post">
            <p className="post-date">
              Objavljeno <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>

            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />
              <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>

            <Link to={`/posts/${_id}`} className="btn btn-light">
              <i className="fas fa-comment-alt" />{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type="button"
                className="btn"
              >
                <i className="fas fa-trash-alt" />
              </button>
            )}
          </div>
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
