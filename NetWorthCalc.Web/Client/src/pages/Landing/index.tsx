import React from 'react';
import { Book, Briefcase, PieChart } from 'react-feather';
import LandingNavBar from '../../components/LandingNavBar';
import LandingGetStarted from '../../components/LandingGetStarted';
import LandingCard from '../../components/LandingCard';
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
          <div className="d-flex mt-5 justify-content-evenly">
            <LandingCard
              icon={<Book />}
              title="Keep track"
              text="Know how much value you have at your disposition at any time."
            />
            <LandingCard
              icon={<Briefcase />}
              title="Stay organized"
              text="Keep your all of your assets and liabilities data neatly organized in one place!"
            />
            <LandingCard
              icon={<PieChart />}
              title="Be smart"
              text="When taking a big financial decision, you'll know what all the monetary resources at your hand are!"
            />
          </div>
          <div className="d-flex mt-5 justify-content-center">
            <LandingGetStarted />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
