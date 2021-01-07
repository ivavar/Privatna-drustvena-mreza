import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileTop = ({
  profile: {
    dateOfBirth,
    phoneNumber,
    position,
    languages,
    company,
    location,
    website,
    social,
    picture,
    user: { name, surname, avatar },
  },
}) => {
  return (
    <div className="profile-top bg-white p-2">
      <img
        className="round-img my-1"
        src={picture === "" ? avatar : picture}
        alt=""
      />
      <div className="div-basic-info">
        {" "}
        <div>
          <h1 className="large text-primary">
            {name} {surname}
          </h1>
        </div>
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
          {location && (
            <p className="lead">
              <i className="fas fa-map-marker-alt"></i> {location}
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
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x" />
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x" />
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x" />
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default ProfileTop;
