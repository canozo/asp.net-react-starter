import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center">
      <h3 className="text-center p-5">
        Page not found, did you get lost?
        <br />
        <button type="button" className="btn btn-link mt-2" onClick={() => history.push('/')}>
          Back to home
        </button>
      </h3>
    </div>
  );
};

export default NotFound;
