import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import PrivateRoute from './components/Private/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Feed from './components/Feed';
import Settings from './components/Private/Settings';
import Profile from './components/Private/Profile';
import Signup from './components/Signup';

import { makeStyles } from '@material-ui/core/styles';
import PostPage from './components/Feed/PostPage';
import RockstarPage from './components/Feed/RockstarPage';


const NotFound: FunctionComponent<{}> = () => <h1>Not Found</h1>;

const useStyles = makeStyles((theme) => ({
  content: {
    height: '70vh',
  },
  appBarSpacerTop: {
    height: '8vh',
  },
}));

function App () {
  const classes = useStyles();
  
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className={classes.appBarSpacerTop} />
        <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/recognition/:id" component={PostPage} />
            <PrivateRoute path="/rockstar/:id" component={RockstarPage} />
            {/* <PrivateRoute path="/profile" component={Profile} /> */}
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