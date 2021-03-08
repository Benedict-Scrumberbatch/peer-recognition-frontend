import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';

import { makeStyles } from '@material-ui/core/styles';


const Home: FunctionComponent<{}> = () => <h1>Home Page</h1>;
const Foo: FunctionComponent<{}> = () => <h1>Foo Page</h1>;
const Bar: FunctionComponent<{}> = () => <h1>Bar Page</h1>;
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
            <Route exact path="/" component={Home} />
            <Route exact path="/foo" component={Foo} />
            <Route exact path="/bar" component={Bar} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
