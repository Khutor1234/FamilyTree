import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppProps } from './App.props';
import { MainPage } from '../../pages';
import { TState, TDispatch } from '../interfaces';
import { userSelector } from '../../store/selectors/user';
import { getUser } from '../../store/actions/user';

const App = ({ getUser, user }: AppProps) => {
  useEffect(() => {
    if (getUser) {
      getUser();
    }
  });

  const routes = !user ? (
    <Route path="/" element={<MainPage />} />
  ) : (
    <>
      <Route path="/" element={<MainPage />} />
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
