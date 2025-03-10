import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import { getPost } from '../../actions/post'

const Post = ({
  getPost,
  post: { post, loading },
  match,
  auth: { profile }
}) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost])

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        <i className='fas fa-arrow-left'></i> Natrag na objave
      </Link>
      <PostItem post={post} showActions={false} />
      {profile !== null && <CommentForm postId={post._id} />}
      <div className='bg-light p'>
        <h3>Komentari ({post.comments.length})</h3>
      </div>
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getPost })(Post)
