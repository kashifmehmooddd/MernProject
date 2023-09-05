import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = ({ profile, user }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center w-100 m-5 align-item-center">
        {!profile ? (
          <> Hey {user.name}! You haven't setup your profile </>
        ) : (
          <>
            <div className="card m-5 overflow-auto">
              <div className="profile m-5">
                <div>
                  <img src={user.avatar} alt="John Doe" />
                </div>
                <div>
                  <h2>{user.name}</h2>
                  <p>{profile.status}</p>
                </div>
                <div className="ms-5">
                  <div className="company m-2">
                    <strong>Company: </strong>
                    {profile.company.toUpperCase()}
                  </div>
                  <div className="githubusername m-2">
                    <strong>github: </strong>
                    {profile.githubusername?.toUpperCase()}
                  </div>
                  <div className="website m-2">
                    <strong>website: </strong>
                    <a href={profile.website} target="_blank">
                      Visit my website
                    </a>
                  </div>
                </div>
              </div>
              <div className="profile skills">
                <strong className="ms-5">Skills: </strong>
                <div className="m-1">{profile.skills.join(", ")}</div>
              </div>
            </div>
          </>
        )}
        <div className="ms-5">
          <Link to="profile" className="btn btn-large btn-dark">
            Set up Profile
          </Link>
        </div>
        <div className="ms-5">
          <Link to="education" className="btn btn-large btn-dark">
            Set up Education
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.auth.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
