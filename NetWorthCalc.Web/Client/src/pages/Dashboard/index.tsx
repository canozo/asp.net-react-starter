import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SideMenu from '../../components/SideMenu';

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
    <div className="d-flex justify-content-between min-vh-100">
      <SideMenu />
      <div style={{ backgroundColor: '#f1f3f8' }} className="container-fluid">
        <div className="container bg-primary mt-5">2</div>
      </div>
    </div>
  );
};

export default Dashboard;
