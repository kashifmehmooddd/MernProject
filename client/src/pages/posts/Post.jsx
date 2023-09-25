import React from "react";
import "./post.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/posts";

const Posts = ({ posts, getPosts }) => {
  console.log(posts);
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container mt-5 posts">
      {posts.map((post) => (
        <div className="card mb-4" key={post.key}>
          <div className="card-body">
            <div className="media">
              <div className="d-flex align-items-center">
              <img src={post.avatar} alt="User 1 Avatar" className="mr-3 rounded-circle" />
              <h5 className="mx-2">{post.name}</h5></div>
              <div className="media-body my-3">
                {post.text}
              </div>
            </div>
          </div>
          <div className="card-footer">
            {post?.comments.map((comment) => (
              <div className="media">
              <img alt="User 2 Avatar" className="mr-3 rounded-circle" s />
              <div className="media-body">
                <strong>User 2:</strong> Comment 1 on the post.
              </div>
            </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
