import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({
  auth: { profile },
  addEducation,
  history,
}) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {profile !== null ? (
        <>
          <Link to="/dashboard" className="btn btn-light">
            <i className="fas fa-arrow-left"></i> Natrag na kontrolnu ploču
          </Link>
          <h1 className="large text-primary">Dodajte obrazovanje</h1>
          <small>* = obvezna polja</small>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              addEducation(formData, history);
            }}
          >
            <div className="form-group">
              <label>* Škola ili tečaj:</label>
              <input
                type="text"
                name="school"
                value={school}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label>* Diploma ili certifikat:</label>
              <input
                type="text"
                name="degree"
                value={degree}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label>* Područje:</label>
              <input
                type="text"
                name="fieldofstudy"
                value={fieldofstudy}
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
                placeholder="Opis programa"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
