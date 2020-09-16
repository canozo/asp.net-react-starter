import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/app" component={Dashboard} />
      <Route path="/logout" component={() => <div>Logout</div>} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  );
}

export default App;
