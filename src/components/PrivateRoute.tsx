import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../api/authHelp';

interface IProps {
  component: React.FC<{}>;
  // any other props that come into the component
}

export default function PrivateRoute({ component, ...rest }: IProps) {
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}