import React from 'react';
import { Link }from 'react-router-dom';
import './LandingNavBar.scss';

const LandingNavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-none">
      <div className="container-sm">
        <Link to="/" className="navbar-brand">
          {/* <img width="180" height="41" src="logo.png" alt="Net Worth Calc" /> */}
          <span className="navbar-title">Net Worth Calculator</span>
        </Link>
        <button type="button" className="btn btn-link">Log in</button>
      </div>
    </nav>
  );
};

export default LandingNavBar;
