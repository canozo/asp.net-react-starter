import React from 'react';
import { Link }from 'react-router-dom';
import './LandingNavBar.scss';

const LandingNavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-sm">
        <Link to="/" className="navbar-brand">
          <span className="navbar-title">Net Worth Calculator</span>
        </Link>
        <button type="button" className="btn btn-dark btn-login">Log in</button>
      </div>
    </nav>
  );
};

export default LandingNavBar;
