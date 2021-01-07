import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardPosts from "./DashboardPosts";
import Experience from "./Experience";
import Education from "./Education";
import DashboardTop from "./DashboardTop";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user, role, profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Kontrolna ploča</h1>
      <p className="lead">
        <i className="fas fa-user" />{" "}
        Dobrodošli {user && user.name} {user && user.surname}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardTop profile={profile}></DashboardTop>
          <DashboardPosts />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Izbriši račun
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {role === "user" && (
            <>
              <p>Uredite vaš profil kako biste mogli koristi ovu mrežu</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Stvori profil
              </Link>
            </>
          )}
          {role === "admin" && (
            <>
              <p>
                Možete dodavati i brisati korisnike te gledati njihove profile i
                objave.
              </p>
            </>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
