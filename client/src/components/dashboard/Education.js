import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import { Link } from "react-router-dom";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{moment.utc(edu.from)}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="DD/MM/YYYY">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-cred">
          <Link title="Uredi" to={`/edit-education/${edu._id}`}>
            <i className="fas fa-pencil-alt" />
          </Link>
        </button>
        <button
          title="Izbriši"
          onClick={() => deleteEducation(edu._id)}
          className="btn btn-cred"
        >
          <i className="fas fa-trash-alt" />
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">
        Obrazovanje{" "}
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-plus-circle" title="Dodaj obrazovanje"></i>{" "}
        </Link>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Ustanova</th>
            <th className="hide-sm">Razina</th>
            <th className="hide-sm">Razdoblje</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
