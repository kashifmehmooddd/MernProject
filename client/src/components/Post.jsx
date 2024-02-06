const Post = ({ post, user, profile, like, unlike, handleComment, removeComment }) => {

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
          <>
            <div className='media' key={index}>
              <div className='d-flex align-items-center'>
                <div className='w-100'>
                  <img
                    alt={comment.name}
                    src={comment.avatar}
                    className='mr-3 rounded-circle'
                  />

                  <strong className='mx-2'>{comment.name}</strong>
                  {user && comment.user === user._id && (
                    <button
                      onClick={() =>
                        removeComment({
                          postId: post._id,
                          commentId: comment._id,
                        })
                      }
                      className='float-end btn btn-danger'
                    >
                      delete
                    </button>
                  )}
                </div>
              </div>
              <div className='media-body'>{comment.text}</div>
            </div>
            {index < post?.comments.length - 1 && <hr />}
          </>
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

export default Post;

