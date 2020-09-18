import React from 'react';
import { useLocation } from 'react-router-dom';
import Body from '../../components/Body';
import './Info.scss';

const Info: React.FC = () => {
  const location = useLocation();

  const path = location.pathname.split('/');
  const monthlyReportId = path[path.length - 1];
  console.log(monthlyReportId);

  return (
    <Body
      title="Report information"
      subtitle="Modify your report informacion."
    >
      Info
    </Body>
  );
};

export default Info;
