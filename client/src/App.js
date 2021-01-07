import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { loadUser, loadProfile } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import Routes from "./components/routing/Routes";
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadProfile());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ Landing } />
          <Route component={ Routes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
