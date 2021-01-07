import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ auth: { profile }, addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {profile !== null ? (
        <>
          <Link to="/dashboard" className="btn btn-light">
            <i className="fas fa-arrow-left"></i> Natrag na kontrolnu ploču
          </Link>
          <h1 className="large text-primary">Dodajte radno iskustvo</h1>
          <small>* = obvezna polja</small>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              addExperience(formData, history);
            }}
          >
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
                  onChange={() => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
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
                disabled={toDateDisabled ? "disabled" : ""}
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
        </>
      ) : (
        <>
          <h1 className="large text-primary">Trebate prvo napraviti profil.</h1>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Stvori profil
          </Link>
        </>
      )}
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
