import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LandingGetStarted: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Link to="/app">
        <button type="button" className="btn btn-lg btn-primary mb-5">Get started!</button>
      </Link>
    );
  }

  return (
    <button type="button" className="btn btn-lg btn-primary mb-5" onClick={loginWithRedirect}>
      Get started!
    </button>
  );
};

export default LandingGetStarted;
