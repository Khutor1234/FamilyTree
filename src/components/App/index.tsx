import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { AppProps } from "./props";
import { MainPage, LoginPage, ProfilePage } from "../../pages";
import { TState, TDispatch } from "../interfaces";
import { userSelector } from "../../store/selectors/user";
import { getUser, logIn } from "../../store/actions/user";

const App = ({ getUser, user, logIn }: AppProps) => {
  useEffect(() => {
    if (getUser) {
      getUser();
    }
  }, [getUser]);

  const routes = !user ? (
    <Route path="/" element={<LoginPage logIn={logIn} />} />
  ) : (
    <>
      <Route path="/" element={<MainPage />} />
      <Route path="/:id" element={<ProfilePage />} />
    </>
  );

  return <Routes>{routes}</Routes>;
};

const mapStateToProps = (state: TState) => ({
  user: userSelector(state),
});

const mapDispatchToProps = (dispatch: TDispatch) =>
  bindActionCreators(
    {
      getUser,
      logIn,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
