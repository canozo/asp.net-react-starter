import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MonthlyReport from '../../interfaces/MonthlyReport';
import Body from '../../components/Body';
import './Info.scss';

const Info: React.FC = () => {
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();

  const path = location.pathname.split('/');
  const monthlyReportId = path[path.length - 1];

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = fetch(`/api/monthlyreport/${monthlyReportId}`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
      const result: MonthlyReport = await response.then(res => res.json());
      setMonthlyReport(result);

      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log(monthlyReport);

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
