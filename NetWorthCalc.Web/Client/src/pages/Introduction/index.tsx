import React from 'react';
import './Introduction.scss';

const Introduction: React.FC = () => {
  return (
    <div className="mt-5">
      <p className="welcome">Welcome to Net Worth Calculator!</p>
      <p className="intro">Select one of the items on the menu to get started right away!</p>
    </div>
  );
};

export default Introduction;
