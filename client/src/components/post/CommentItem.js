import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

function GetFilename (url) {
  let type = url.split('.').pop()
  if (url) {
    var m = url.toString().match(/.*\/(.+?)\./)
    if (m && m.length > 1) {
      return m[1] + '.' + type
    }
  }
  return ''
}

const CommentItem = ({
  postId,
  comment: { _id, text, name, surname, avatar, user, date, fileURL, picture },
  auth,
  deleteComment
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img
          className='round-img'
          src={picture === '' ? avatar : picture}
          alt=''
        />
        <h4>
          {name} {surname}
        </h4>
      </Link>
    </div>
    <div className='post-content'>
      <p className='my-1'>{text}</p>
      {fileURL && (
        <a href={fileURL}>
          {GetFilename(fileURL)}
          <object width='100%' height='500px' data={fileURL}>
            {''}
          </object>
        </a>
      )}
      <p className='post-date'>
        Objavljeno <Moment format='DD/MM/YYYY'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type='button'
          className='btn'
        >
          <i className='fas fa-trash-alt' />
        </button>
      )}
    </div>
  </div>
)

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
