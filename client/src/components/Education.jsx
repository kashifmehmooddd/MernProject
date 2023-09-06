import React from "react";
import { deleteEducation } from "../actions/auth";
import { connect } from "react-redux";

const Education = ({ education, deleteEducation }) => {
  const handleDelete = (id) => {
    deleteEducation(id);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{education.school}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {education.fieldofstudy}
        </h6>
        <p className="card-text">
          From: {education.from.split("T")[0]} - To:{" "}
          {education.current ? "Current" : education.to}
        </p>
        <p className="card-text">{education.description}</p>
      </div>
      <div className="card-footer text-muted">
        <button
          type="button"
          className="btn btn-danger float-end"
          onClick={() => handleDelete(education._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default connect(null, { deleteEducation })(Education);
