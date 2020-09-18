import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SideMenu from '../../components/SideMenu';

const Dashboard: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently()
      .catch(err => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="d-flex justify-content-between min-vh-100">
      <SideMenu />
      <div className="container-fluid bg-dark">
        <div className="container bg-primary">2</div>
      </div>
    </div>
  );
};

export default Dashboard;
