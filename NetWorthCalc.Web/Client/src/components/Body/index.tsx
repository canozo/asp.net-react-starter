import React from 'react';
import './Body.scss'

interface Props {
  title: string;
  children: React.ReactNode;
};

const NewReport: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="body mt-3">
      <p className="header">{title}</p>
      {children}
    </div>
  );
};

export default NewReport;
