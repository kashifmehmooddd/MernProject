import Comment from "./Comment";
import {
  addComment,
  removeComment,
  like,
  unlike
} from "../actions/posts";
import { connect } from "react-redux";

const Post = ({ post, user, profile, like, unlike, removeComment }) => {
  const handleComment = (e, id) => {
    e.preventDefault();
    addComment({
      text: e.target.querySelector('input.form-control').value,
      id,
    });
  };

  return (
    <div className='card mb-4' key={post._id}>
      <div className='card-body'>
        <div className='media'>
          <div className='d-flex align-items-center'>
            <img
              src={post.avatar}
              alt='User 1 Avatar'
              className='mr-3 rounded-circle'
            />
            <h5 className='mx-2'>{post.name}</h5>
          </div>
          <div className='media-body my-3'>{post.text}</div>
        </div>
      </div>
      <div class='d-flex mx-2 justify-content-between'>
        <div>
          {post.likes.length} likes
        </div>
        <div>
          {post.comments.length} comments
        </div>
      </div>
      <hr className='m-0s' />
      {profile && (<>
        <div>
          {post.likes?.some((like) => like.user === user._id) ? (
            <>
              <button
                type='button'
                className='btn btn-dark m-2 float-end'
                onClick={() => unlike(post._id)}
              >
                Unlike
              </button>
            </>
          ) : (
            <>
              <button
                type='button'
                className='btn btn-dark m-2 float-end'
                onClick={() => like(post._id)}
              >
                Like
              </button>
            </>
          )}
        </div>
      </>)}
      <p></p>
      <div className='card-footer'>
        {post?.comments.map((comment, index) => (
          <Comment comment={comment} index={index} removeComment={removeComment} post={post} user={user} />
        ))}
      </div>
      {profile && (
        <>
          <form onSubmit={(e) => handleComment(e, post._id)}>
            <div className='d-flex comment'>
              <input
                required
                className='form-control'
                id={post._id}
                placeholder='Add your comment...'
              />{' '}
              <button type='submit' className='btn btn-dark mx-2'>
                Comment
              </button>
            </div>
          </form>{' '}
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.auth.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  addComment,
  removeComment,
  like,
  unlike
})(Post);

