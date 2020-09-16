import React from 'react';
import { Link }from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AccessButtons: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <>
        <Link to="/app">
          <button type="button" className="btn btn-dark">
            Dashboard
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-dark ml-2"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log out
        </button>
      </>
    );
  }

  return (
    <button type="button" className="btn btn-dark" onClick={loginWithRedirect}>
      Log in
    </button>
  );
};

export default AccessButtons;
