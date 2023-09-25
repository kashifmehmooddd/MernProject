import React from "react";

const Profile = ({ profile, user }) => {
  return (
    <div className="card m-2 overflow-auto">
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
            <a target="_blank" href={`https://github.com/${profile.githubusername}`}>{profile.githubusername?.toUpperCase()}</a>
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
  );
};

export default Profile;
