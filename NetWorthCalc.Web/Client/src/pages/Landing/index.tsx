import React from 'react';
import LandingNavBar from '../../components/LandingNavBar';
import './Landing.scss';

const Landing: React.FC = () => {
  return (
    <>
      <LandingNavBar />
      <div className="landing-curve">
        <div className="container-sm pt-5">
          <div className="landing-text-container text-wrap text-center">
            <p className="landing-title">
              Track your <b>Net Worth</b> and make the most educated choices with your money!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
