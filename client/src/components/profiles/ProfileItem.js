import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, surname, avatar },
    company,
    location,
    position,
    picture,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img
        src={picture === "" ? avatar : picture}
        alt=""
        className="round-img"
      />
      <div>
        <h2>
          {name} {surname}
        </h2>
        <p>
          {position} {company && <span> u {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
      </div>
      <div className="div-view-profile">
        <Link to={`/profile/${_id}`} className="btn-view-profile">
          <i className="fas fa-chevron-right"></i>
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
