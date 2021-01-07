import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import { Link } from "react-router-dom";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="MM/DD/YYYY">{moment.utc(exp.from)}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="MM/DD/YYYY">{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-cred">
          <Link title="Uredi" to={`/edit-experience/${exp._id}`}>
            <i className="fas fa-pencil-alt" />
          </Link>
        </button>
        <button
          title="Izbriši"
          onClick={() => deleteExperience(exp._id)}
          className="btn btn-cred"
        >
          <i className="fas fa-trash-alt" />
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div>
        <h2 className="my-2">
          Radno iskustvo
          <Link to="/add-experience" className="btn btn-light">
            <i className="fas fa-plus-circle" title="Dodaj radno iskustvo"></i>{" "}
          </Link>
        </h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Tvrtka</th>
            <th className="hide-sm">Pozicija</th>
            <th className="hide-sm">Razdoblje</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
