import { useState } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const ProfileSetup = ({ profile, createProfile, setAlert }) => {
  const [formData, setFormData] = useState({
    company: profile?.company,
    skills: profile?.skills.join(", "),
    githubusername: profile?.githubusername,
    bio: profile?.bio,
    status: profile?.status,
    location: profile?.location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(formData);
  };

  return (
    <div className="container mt-5">
      <h1> {profile ? "Edit" : "Set Up"} Your Profile </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills</label>
          <input
            type="text"
            className="form-control"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">GitHub Username</label>
          <input
            type="text"
            className="form-control"
            id="github"
            name="githubusername"
            value={formData.githubusername}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            required
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

const mapStatesToProps = (state) => ({
  profile: state.auth.profile,
});

export default connect(mapStatesToProps, { createProfile, setAlert })(
  ProfileSetup
);
