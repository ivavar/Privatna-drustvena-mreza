import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import PrivateRoute from "./PrivateRoute";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import EditExperience from "../profile-forms/EditExperience";
import EditEducation from "../profile-forms/EditEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import AdminRoute from "./AdminRoute";
import EditProfilePicture from "../profile-forms/EditProfilePicture";
import Users from "../users/Users";
import NotFound from "../layout/NotFound";
import UserRoute from "./UserRoute";
import Settings from "../auth/Settings";
import ProfilePosts from "../profile-posts/ProfilePosts";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <AdminRoute exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <AdminRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <UserRoute exact path="/create-profile" component={CreateProfile} />
        <UserRoute exact path="/edit-profile" component={EditProfile} />
        <UserRoute
          exact
          path="/edit-profile-picture"
          component={EditProfilePicture}
        />
        <UserRoute exact path="/add-experience" component={AddExperience} />
        <UserRoute exact path="/add-education" component={AddEducation} />
        <UserRoute
          exact
          path="/edit-experience/:expId"
          component={EditExperience}
        />
        <UserRoute exact path="/edit-education/:id" component={EditEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <UserRoute exact path="/settings" component={Settings} />
        <PrivateRoute
          exact
          path="/profile-posts/:id"
          component={ProfilePosts}
        ></PrivateRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </section>
  );
};

export default Routes;
