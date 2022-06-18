import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as Dashboard } from 'app/containers/App';
import { Services } from 'app/containers/Services';
import { Join } from 'app/containers/Join';
import { Execute } from 'app/containers/Execute';
// import { Dashboard } from 'app/containers/Dashboard';
import { SignIn } from 'app/containers/SignIn';
import { SignUp } from 'app/containers/SignUp';
import { SideBar } from 'app/components/SideBar';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <div className="row">
    {window.location.pathname.indexOf('/sign') === -1 && <SideBar /> }
  <Switch>
    <Route  exact path="/" component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/join" component={Join} />
    <Route path="/services" component={Services} />
    <Route path="/execute" component={Execute} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
  </Switch>
  </div>
));
