import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const DashboardTop = ({
  profile: {
    dateOfBirth,
    phoneNumber,
    position,
    languages,
    company,
    city,
    website,
    social,
    picture,
  },
  auth,
}) => {
  return (
    <div className="dashboard-top p-2">
      <div className="dis-flex">
        <img
          className="dashboard-img my-1"
          src={picture === "" ? auth.avatar : picture}
          alt=""
        />
        <Link to="/edit-profile-picture" className="btn btn-light">
          <i
            className="fas fa-pencil-alt text-primary"
            title="Uredi profilnu sliku"
          />
        </Link>
      </div>
      <div className="dis-flex">
        {" "}
        <div>
          <p className="lead">
            <b>{position}</b>
            {company && (
              <span>
                {" "}
                u <b>{company}</b>
              </span>
            )}
          </p>
          {phoneNumber && (
            <p className="lead">
              <i className="fas fa-phone"></i> +{phoneNumber}
            </p>
          )}
          {dateOfBirth && (
            <p className="lead">
              <i className="fas fa-birthday-cake"></i>{" "}
              <Moment format="DD/MM/YYYY">{dateOfBirth}</Moment>
            </p>
          )}
          <div className="languages">
            {languages.length !== 0 && (
              <div className="lead lang">
                <b>Jezici: </b>
                {languages.map((language, index) => (
                  <div key={index}> {language},</div>
                ))}
              </div>
            )}
          </div>
          <div>
            {city && (
              <p className="lead">
                <i className="fas fa-map-marker-alt"></i> {city}
              </p>
            )}
          </div>
          <div className="icons my-1">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x" />
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x" />
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x" />
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x" />
              </a>
            )}
          </div>
        </div>
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-pencil-alt text-primary" title="Uredi profil" />
        </Link>
      </div>
    </div>
  );
};

DashboardTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(DashboardTop);
