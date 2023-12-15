import React from 'react';
import './post.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts, createPost, addComment } from '../../actions/posts';
import { setAlert } from '../../actions/alert';
import $ from 'jquery';

const Posts = ({ posts, getPosts, user, profile, createPost, addComment }) => {
  const handleCreate = () => {
    $('.modal').addClass('d-block');
  };

  const handleRemoveModal = () => {
    $('.modal').removeClass('d-block');
  };

  const handleShare = (e) => {
    e.preventDefault();
    createPost({ text: $('#text').val() }).then((result) => {
      if (result) {
        $('#text').val('');
        $('.modal').removeClass('d-block');
      }
    });
  };

  const handleComment = (e, id) => {
    e.preventDefault();
    addComment({
      text: e.target.querySelector('input.form-control').value,
      id,
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='container d-flex flex-column'>
      {profile && (
        <>
          {' '}
          <div className='create-post my-3'>
            <button
              className='float-end btn btn-outline-dark'
              onClick={handleCreate}
            >
              Share Your thought
            </button>
          </div>
          <div class='modal' tabindex='-1' style={{ top: '100px' }}>
            <div class='modal-dialog'>
              <div class='modal-content'>
                <form onSubmit={handleShare}>
                  <div class='modal-header'>
                    <h5 class='modal-title'>
                      <div className='media'>
                        <div className='d-flex align-items-center'>
                          <img
                            src={user.avatar}
                            alt='User 1 Avatar'
                            className='mr-3 rounded-circle'
                            style={{ width: '40px' }}
                          />
                          <h5 className='mx-2'>{user.name}</h5>
                        </div>
                      </div>
                    </h5>
                    <button
                      type='button'
                      class='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                      onClick={handleRemoveModal}
                    ></button>
                  </div>
                  <div class='modal-body'>
                    <div class='mb-3'>
                      <textarea
                        required
                        type='text'
                        class='form-control'
                        id='text'
                        placeholder='Share your thought...'
                      />
                    </div>
                  </div>
                  <div class='modal-footer'>
                    <button type='submit' class='btn btn-dark'>
                      Share
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <div className='mt-5 posts'>
        {posts.map((post) => (
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
            <div className='card-footer'>
              {post?.comments.map((comment, index) => (
                <>
                  <div className='media' key={index}>
                    <div className='d-flex align-items-center'>
                      <img
                        src={comment.avatar}
                        className='mr-3 rounded-circle'
                      />
                      <strong className='mx-2'>{comment.name}</strong>
                    </div>
                    <div className='media-body'>{comment.text}</div>
                  </div>
                  <hr />
                </>
              ))}
            </div>

            <form onSubmit={(e) => handleComment(e, post._id)}>
              <div className='d-flex comment'>
                <input
                  required
                  className='form-control'
                  id={post._id}
                  placeholder='Add your comment...'
                />{' '}
                <button className='btn btn-dark mx-2'>Comment</button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  profile: state.auth.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getPosts,
  createPost,
  setAlert,
  addComment,
})(Posts);
