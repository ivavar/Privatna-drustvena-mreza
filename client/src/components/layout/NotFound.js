import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <h2 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> Stranica nije pronađena
      </h2>
      <p className="large">Ova stranica nažalost ne postoji.</p>
    </Fragment>
  );
};

export default NotFound;
