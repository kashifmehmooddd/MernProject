

const Comment = ({ comment, index, removeComment, post, user }) => {
  return (
    <div>
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
    </div>
  )
}

export default Comment;
