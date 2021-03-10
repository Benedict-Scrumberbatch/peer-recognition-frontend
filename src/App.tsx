import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Feed from './components/Feed';

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
            <Route exact path="/foo" component={Foo} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/bar" component={Bar} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/feed" component={Feed} />
            <PrivateRoute path="/profile" component={Foo} />
            <Route path="/404" component={NotFound} />
            
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;