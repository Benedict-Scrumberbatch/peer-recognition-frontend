import * as React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import auth from '../api/authHelper'

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  path: string;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route {...rest} render={(props) => (
      auth.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
}

export default PrivateRoute;