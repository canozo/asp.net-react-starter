import React from 'react';
import './LandingCard.scss';

interface Props {
  icon: React.ReactNode;
  title: string;
  text: string;
};

const LandingCard: React.FC<Props> = ({ icon, title, text }) => {
  return (
    <div className="card mx-3 landing-card">
      <div className="card-body text-center">
        <h5 className="card-title">{icon} {title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default LandingCard;
