import React from 'react';
import { Link }from 'react-router-dom';
import AccessButtons from './AccessButtons';
import './LandingNavBar.scss';

const LandingNavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-sm">
        <Link to="/" className="navbar-brand">
          <span className="navbar-title">Net Worth Calculator</span>
        </Link>
        <div className="d-flex justify-content-between navbar-access-buttons">
          <AccessButtons />
        </div>
      </div>
    </nav>
  );
};

export default LandingNavBar;
