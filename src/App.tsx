import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import PrivateRoute from './components/Private/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Feed from './components/Feed';
import Settings from './components/Settings';
import Profile from './components/Private/Profile';

import { makeStyles } from '@material-ui/core/styles';


const Foo: FunctionComponent<{}> = () => <h1>Foo Page</h1>;
const NotFound: FunctionComponent<{}> = () => <h1>Not Found</h1>;

const useStyles = makeStyles((theme) => ({
  content: {
    minHeight: '80vh'
  },
}));

function App () {
  const classes = useStyles();
  
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/foo" component={Foo} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route path="/404" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;