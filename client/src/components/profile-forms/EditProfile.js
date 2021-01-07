import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    city: "",
    position: "",
    languages: "",
    bio: "",
    dateOfBirth: "",
    phoneNumber: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      city: loading || !profile.city ? "" : profile.city,
      position: loading || !profile.position ? "" : profile.position,
      languages:
        loading || !profile.languages ? "" : profile.languages.join(","),
      bio: loading || !profile.bio ? "" : profile.bio,
      dateOfBirth: loading || !profile.dateOfBirth ? "" : profile.dateOfBirth,
      phoneNumber: loading || !profile.phoneNumber ? "" : profile.phoneNumber,
      avatar: loading || !profile.avatar ? "" : profile.avatar,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  const {
    company,
    website,
    city,
    position,
    languages,
    bio,
    dateOfBirth,
    phoneNumber,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    avatar,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <Link to="/dashboard" className="btn btn-light">
        <i className="fas fa-arrow-left"></i> Natrag na kontrolnu ploču
      </Link>
      <h1 className="large text-primary">Uredite vaš profil</h1>
      <p className="lead">
        <i className="fas fa-user" /> Uredite informacije o sebi
      </p>
      <small>* = obvezna polja</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>* Pozicija:</label>
          <input
            type="text"
            name="position"
            value={position}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Pozicija na kojoj radite</small>
        </div>
        <div className="form-group">
          <label>* Tvrtka:</label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Vaša tvrtka ili za koju radite</small>
        </div>
        <div className="form-group">
          <label>Mrežna stranica:</label>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Vaša vlastita mrežna stranica ili tvrtkina
          </small>
        </div>
        <div className="form-group">
          <label>Grad:</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Grad (eg. Split)</small>
        </div>
        <div className="form-group">
          <label>Jezici:</label>
          <input
            type="text"
            name="languages"
            value={languages}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Koristite zarez za odvajanje (eg. Croatian,English,German)
          </small>
        </div>
        <div className="form-group">
          <label>Broj mobitela:</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Poslovni ili privatni broj mobitela
          </small>
        </div>
        <div className="form-group">
          <label>Datum rođenja:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Kratka biografija"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Napišite nešto o sebi</small>
        </div>
        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Dodajte poveznice na društvene mreže
          </button>
          <span>(opcionalno)</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input
          type="submit"
          className="btn btn-primary my-1 submit-btn"
          value="Podnesi"
        />
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { 
  createProfile,
getCurrentProfile
})(withRouter(EditProfile));
