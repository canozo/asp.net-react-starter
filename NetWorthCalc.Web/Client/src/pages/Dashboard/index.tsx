import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => { console.log(token); return token; })
      .then(token => fetch(`/api/weatherforecast`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }))
      .then(res => res.ok ? res.json() : {})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      /app
    </div>
  );
};

export default Dashboard;
