import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({
  auth: { isAuthenticated, loading, role, name, surname, avatar, picture },
  logout,
}) => {
  const authLinks = (
    <ul>
      {role !== "admin" && (
        <li>
          <div>
            <Link to="/dashboard" className="nav-img-name">
              <img
                src={picture === "" ? avatar : picture}
                className="nav-img"
                alt=""
              />
              <span className="hide-sm">
                {name} {surname}
              </span>
            </Link>
          </div>
        </li>
      )}
      {role === "admin" && (
        <>
          <li>
            <Link to="/users">
              <i className="fas fa-user-friends" />{" "}
              <span className="hide-sm">Korisnici</span>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <i className="fas fa-user-plus" />{" "}
              <span className="hide-sm">Novi korisnik</span>
            </Link>
          </li>
        </>
      )}
      <li>
        <Link to="/profiles">
          <i className="fas fa-user-friends" />{" "}
          <span className="hide-sm">Profili</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-comment-alt" />{" "}
          <span className="hide-sm">Objave</span>
        </Link>
      </li>

      {role !== "admin" && (
        <li>
          <Link to="/settings">
            <i className="fas fa-cog" />{" "}
            <span className="hide-sm">Postavke</span>
          </Link>
        </li>
      )}

      <li>
        <a onClick={logout} href="/login">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Odjava</span>
        </a>
      </li>
    </ul>
  );

  const publicLinks = (
    <ul>
      <li>
        <Link to="/login">Prijava</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-globe" /> Privatna društvena mreža
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : publicLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
