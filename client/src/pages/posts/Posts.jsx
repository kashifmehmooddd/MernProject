import React from 'react';
import './post.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getPosts,
  createPost,
  addComment,
  removeComment,
  like,
  unlike,
} from '../../actions/posts';
import { setAlert } from '../../actions/alert';
import $ from 'jquery';
import Post from '../../components/Post';

const Posts = ({
  posts,
  getPosts,
  user,
  profile,
  createPost,
  addComment,
  removeComment,
  like,
  unlike,
}) => {
  const handleCreate = () => {
    $('.modal').addClass('d-block');
  };

  const handleRemoveModal = () => {
    $('.modal').removeClass('d-block');
  };

  const handleComment = (e, id) => {
    e.preventDefault();
    addComment({
      text: e.target.querySelector('input.form-control').value,
      id,
    });
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
          <div className='modal' tabindex='-1' style={{ top: '100px' }}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <form onSubmit={handleShare}>
                  <div className='modal-header'>
                    <h5 className='modal-title'>
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
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                      onClick={handleRemoveModal}
                    ></button>
                  </div>
                  <div className='modal-body'>
                    <div className='mb-3'>
                      <textarea
                        required
                        type='text'
                        className='form-control'
                        id='text'
                        placeholder='Share your thought...'
                      />
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='submit' className='btn btn-dark'>
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
          <Post post={post} handleComment={handleComment} />
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
  removeComment,
  like,
  unlike,
})(Posts);
