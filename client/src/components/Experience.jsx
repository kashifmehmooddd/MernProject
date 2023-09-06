import { connect } from "react-redux";
import { deleteExperience } from "../actions/auth";

const Experience = ({ experience, deleteExperience }) => {
  const handleDelete = (id) => {
    deleteExperience(id);
  };
  return (
    <div className="card mb-3" key={experience._id}>
      <div className="card-body">
        <h5 className="card-title">{experience.company}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{experience.title}</h6>
        <p className="card-text">
          From: {experience.from.split("T")[0]} - To:{" "}
          {experience.current ? "Current" : experience.to}
        </p>
        <p className="card-text">{experience.description}</p>
      </div>
      <div className="card-footer text-muted">
        <button
          type="button"
          className="btn btn-danger float-end"
          onClick={() => handleDelete(experience._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default connect(null, { deleteExperience })(Experience);
