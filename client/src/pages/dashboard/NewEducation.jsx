import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { createEducation } from "../../actions/auth";
import $ from "jquery";

const NewEducation = ({ profile, setAlert, createEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    description: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
  });
  const navigate = useNavigate();

  if (profile === null) {
    setAlert("You need to setup the profile first", "danger");
    return <Navigate to="/dashboard/profile" />;
  }

  const handleCheck = (e) => {
    if (e.target.checked) {
      $("#to").hide();
      $("#input-id").removeAttr("required", "false");
    } else {
      $("#to").show();
      $("#input-id").attr("required", "true");
    }
    setFormData({ ...formData, current: e.target.checked, to: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEducation(formData);
    navigate("/dashboard");
  };
  return (
    <div className="container mt-5">
      <h1> Add Your Education </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Schoool</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Field of Study</label>
          <input
            type="text"
            className="form-control"
            id="fieldofstudy"
            name="fieldofstudy"
            value={formData.fieldofstudy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">From</label>
          <input
            type="date"
            className="form-control"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3" id="to">
          <label className="form-label">To</label>
          <input
            required
            type="date"
            className="form-control"
            id="input-id"
            name="to"
            value={formData.to}
            onChange={handleChange}
          />
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox"
            onChange={handleCheck}
          />
          <label className="form-check-label" for="flexCheckDefault">
            Current
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            required
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
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
export default connect(mapStatesToProps, { setAlert, createEducation })(
  NewEducation
);
