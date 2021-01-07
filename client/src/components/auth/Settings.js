import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { changeAccountSettings } from "../../actions/auth";

const Settings = ({
  setAlert,
  auth,
  changeAccountSettings,
  loading,
}) => {
  const [fromData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    setFormData({
      name: loading ? "" : auth.name,
      surname: loading ? "" : auth.surname,
      email: loading ? "" : auth.email,
    });
  }, [loading]);

  const { name, surname, email, password, password2 } = fromData;
  const onChange = (e) =>
    setFormData({ ...fromData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Lozinke se ne podudaraju.", "danger");
    } else {
      changeAccountSettings({ name, surname, email, password });
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Postavke</h1>
      <p className="lead">
        <i className="fas fa-user" /> Uredi postavke računa
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Ime:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label>Prezime:</label>
          <input
            type="text"
            name="surname"
            value={surname}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>Elektronička adresa:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nova lozinka:</label>
          <input
            type="password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Potvrdite novu lozinku:</label>
          <input
            type="password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary submit-btn"
          value="Podnesi"
        />
      </form>
    </Fragment>
  );
};

Settings.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changeAccountSettings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, changeAccountSettings })(
  Settings
);
