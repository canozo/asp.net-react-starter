import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/app" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
