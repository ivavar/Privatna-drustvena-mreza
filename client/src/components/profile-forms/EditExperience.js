import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, editExperience } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const EditExperience = ({
  profile: { profile, loading },
  getCurrentProfile,
  editExperience,
  history,
  match,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const expId = match.params.expId;

  useEffect(() => {
    getCurrentProfile();
    console.log("profile: ", profile);
    const expArray = profile.experience;
    const expToEdit = expArray.find((exp) => exp._id === expId);
    setFormData({
      company: loading || !expToEdit.company ? "" : expToEdit.company,
      title: loading || !expToEdit.title ? "" : expToEdit.title,
      location: loading || !expToEdit.location ? "" : expToEdit.location,
      from: loading || !expToEdit.from ? "" : expToEdit.from,
      to: loading || !expToEdit.to ? "" : expToEdit.to,
      current: loading || !expToEdit.current ? false : expToEdit.current,
      description:
        loading || !expToEdit.description ? "" : expToEdit.description,
    });
  }, [loading, getCurrentProfile]);

  const { company, title, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    editExperience(formData, history, expId);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/dashboard" className="btn btn-light">
        <i className="fas fa-arrow-left"></i> Natrag na kontrolnu ploču
      </Link>
      <h1 className="large text-primary">Uredite iskustvo</h1>
      <p className="lead">
        <i className="fas fa-code-branch" />
      </p>
      <small>* = obvezna polja</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>* Pozicija:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label>* Tvrtka:</label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label>Lokacija:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>* Datum početka:</label>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: e.target.checked ? true : false,
                  to: current ? "" : to,
                });
              }}
            />{" "}
            Trenutno
          </p>
        </div>
        <div className="form-group">
          <label>Datum završetka:</label>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={current ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Opis posla"
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1 submit-btn"
          value="Podnesi"
        />
      </form>
    </Fragment>
  );
};

EditExperience.propTypes = {
  editExperience: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { 
  getCurrentProfile, 
  editExperience,
})( withRouter(EditExperience));
