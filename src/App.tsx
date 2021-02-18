import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Header from './components/Header';

const Home: FunctionComponent<{}> = () => <h1>Home Page</h1>;
const Foo: FunctionComponent<{}> = () => <h1>Foo Page</h1>;
const Bar: FunctionComponent<{}> = () => <h1>Bar Page</h1>;
const NotFound: FunctionComponent<{}> = () => <h1>Not Found</h1>;

function App () {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="page">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/foo" component={Foo} />
            <Route exact path="/bar" component={Bar} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
