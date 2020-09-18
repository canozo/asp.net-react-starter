import React from 'react';
import './Body.scss'

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const NewReport: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <div className="body mt-3 css-fade">
      <p className="header">{title}</p>
      <p className="subheader">{subtitle}</p>
      {children}
    </div>
  );
};

export default NewReport;
