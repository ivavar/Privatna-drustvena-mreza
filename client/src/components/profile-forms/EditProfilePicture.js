import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  uploadProfilePicture,
  deleteProfilePicture,
} from "../../actions/profile";
import { Link } from "react-router-dom";

const EditProfilePicture = ({
  uploadProfilePicture,
  deleteProfilePicture,
  history,
  auth: { profile, picture, avatar },
}) => {
  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "",
      uploadPreset: "",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        picture = result.info.secure_url;
        uploadProfilePicture({ picture }, history);
        myWidget.close();
      }
    }
  );

  return (
    <Fragment>
      {profile !== null ? (
        <>
          <Link to="/dashboard" className="btn btn-light">
            <i className="fas fa-arrow-left"></i> Natrag na kontrolnu ploču
          </Link>
          <h1 className="large text-primary">Uredite profilnu sliku</h1>{" "}
          <div>
            <img
              src={picture === "" ? avatar : picture}
              className="profile-picture"
              alt=""
            />
            <div>
              <button
                className="btn btn-primary my-1"
                onClick={() => {
                  myWidget.open();
                }}
              >
                Učitaj <i className="fas fa-upload"></i>
              </button>
              <button
                className="btn btn-danger my-1"
                onClick={() => deleteProfilePicture(history)}
              >
                Izbriši{" "}
                <i className="fas fa-trash-alt trash-profile-picture " />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="large text-primary">Trebate prvo napraviti profil</h1>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Stvori profil
          </Link>
        </>
      )}
    </Fragment>
  );
};

EditProfilePicture.propTypes = {
  uploadProfilePicture: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteProfilePicture: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, {
  uploadProfilePicture,
  deleteProfilePicture,
})(withRouter(EditProfilePicture));
