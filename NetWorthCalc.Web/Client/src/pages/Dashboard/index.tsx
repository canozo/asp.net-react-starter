import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently()
      .catch(err => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;
