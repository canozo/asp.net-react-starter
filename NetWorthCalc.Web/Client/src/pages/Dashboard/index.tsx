import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SideMenu from '../../components/SideMenu';
import Introduction from '../../pages/Introduction';
import Reports from '../../pages/Reports';
import NewReport from '../../pages/NewReport';
import History from '../../pages/History';
import NotFound from '../../pages/NotFound';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      history.push('/');
    }
  }, [history, isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center">
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-between min-vh-100 css-fade">
      <SideMenu />
      <div className="container-fluid dashboard">
        <div className="container mt-5">
          <div className="title" onClick={() => history.push('/')}>
            Net Worth Calculator
          </div>
          <Switch>
            <Route exact path="/app" component={Introduction} />
            <Route path="/app/reports" component={Reports} />
            <Route path="/app/new" component={NewReport} />
            <Route path="/app/history" component={History} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
