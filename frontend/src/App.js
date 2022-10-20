import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { useSelector } from "react-redux";
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import PostShowPage from './components/PostShowPage';



export default function App() {
  // const currentUser = useSelector(state => state.session.user);
  
  const userProfile = () => {
    let profilePath = '/people/:userId';
      return (
      <Route path={profilePath}>
        <ProfilePage />
      </Route>
      );
  };

  const userSettings = () => {
    let settingsPath = '/:userId/account-settings';
    return (
      <Route path={settingsPath}>
        <SettingsPage />
      </Route>
    );
  };

  return (
    <Switch>
      <Route exact path="/">
        <SplashPage />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/sign-up">
        <SignupFormPage />
      </Route>
      <Route path="/homepage">
        <HomePage />
      </Route>
      {/* { currentUser ? userProfile() : null } */}
      {userProfile()}
      {/* { currentUser ? userSettings() : null} */}
      {userSettings()}
      <Route path="/photos/:userId/:postId">
          <PostShowPage />
      </Route>
    </Switch>
  );
}
