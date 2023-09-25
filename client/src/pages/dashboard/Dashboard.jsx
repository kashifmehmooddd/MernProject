import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Education from "../../components/Education";
import Experience from "../../components/Experience";
import Profile from "../../components/Profile";

const Dashboard = ({ profile, user }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center w-100 m-2 align-item-center">
        {!profile ? (
          <> Hey {user.name}! You haven't setup your profile </>
        ) : (
          <>
            <Profile user={user} profile={profile} />
          </>
        )}
        <div className="ms-5">
          <Link to="profile" className="btn btn-large btn-dark">
            Set up Profile
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center w-100 m-2 align-item-center">
        <div className="container mt-5">
          <h1 className="mb-4">Education</h1>
          {profile?.education?.length > 0 ? (
            <>
              {" "}
              {profile?.education?.map((education) => (
                <Education education={education} key={ education._id } />
              ))}
            </>
          ) : (
            <>You havent add your education yet!</>
          )}
        </div>
        <div className="ms-2">
          <Link to="education" className="btn btn-large btn-dark w-100">
            Add Education
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center w-100 m-2 align-item-center">
        <div className="container mt-5">
          <h1 className="mb-4">Experience</h1>
          {profile?.experience?.length > 0 ? (
            <>
              {" "}
              {profile?.experience?.map((experience) => (
                <Experience experience={experience} key={experience._id} />
              ))}
            </>
          ) : (
            <>You havent add your experiences yet!</>
          )}
        </div>
        <div className="ms-2">
          <Link to="experience" className="btn btn-large btn-dark w-100">
            Add Experience
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
