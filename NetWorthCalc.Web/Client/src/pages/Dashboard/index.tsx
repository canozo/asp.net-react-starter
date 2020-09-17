import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard: React.FC = () => {
  const [token, setToken] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => setToken(token))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      Bearer {token}
    </div>
  );
};

export default Dashboard;
