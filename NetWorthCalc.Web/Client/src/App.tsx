import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <div>Landing</div>} />
      <Route path="/app" component={() => <div>App</div>} />
      <Route path="/logout" component={() => <div>Logout</div>} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  );
}

export default App;
