import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { editEducation } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const EditEducation = ({
  profile: { profile, loading },
  getCurrentProfile,
  editEducation,
  history,
  match,
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

  const eduId = match.params.id;

  useEffect(() => {
    getCurrentProfile();
    const eduArray = profile.education;
    const eduToEdit = eduArray.find((edu) => edu._id === eduId);

    setFormData({
      school: loading || !eduToEdit.school ? "" : eduToEdit.school,
      degree: loading || !eduToEdit.degree ? "" : eduToEdit.degree,
      fieldofstudy:
        loading || !eduToEdit.fieldofstudy ? "" : eduToEdit.fieldofstudy,
      from: loading || !eduToEdit.from ? "" : eduToEdit.from,
      to: loading || !eduToEdit.to ? "" : eduToEdit.to,
      current: loading || !eduToEdit.current ? false : eduToEdit.current,
      description:
        loading || !eduToEdit.description ? "" : eduToEdit.description,
    });
  }, [loading, getCurrentProfile]);

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();
    editEducation(formData, history, eduId);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/dashboard" className="btn btn-light">
        <i className="fas fa-arrow-left"></i> Natrag na kontrolnu ploču
      </Link>
      <h1 className="large text-primary">Uredite obrazovanje</h1>
      <small>* = obvezna polja</small>
      <form className="form" onSubmit={onSubmit}>
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
            required
          />
        </div>
        <div className="form-group">
          <label>Datum početka:</label>
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
            />
            {console.log("current", current)}
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
    </Fragment>
  );
};

EditEducation.propTypes = {
  editEducation: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  editEducation,
})(withRouter(EditEducation));
