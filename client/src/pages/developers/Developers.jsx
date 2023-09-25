import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profiles";
import "./developers.css";

const Developers = ({ getProfiles, profiles }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <div className="developer">
      {!profiles.length > 0 && <>Loading...</>}
      {profiles.length > 0 && (
        <>
          {profiles.map((profile) => (
            <div className="card m-5 overflow-auto" key={profile._id}>
              <div className="profile m-5">
                <div>
                  <img src={profile.user.avatar} alt="John Doe" />
                </div>
                <div>
                  <h2>{profile.user.name}</h2>
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
                <div className="ms-5">
                  <button className="btn btn-large btn-dark">
                    Show profile
                  </button>
                </div>
              </div>
              <div className="profile skills">
                <strong className="ms-5">Skills: </strong>
                <div className="m-1">{profile.skills.join(", ")}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfiles })(Developers);
