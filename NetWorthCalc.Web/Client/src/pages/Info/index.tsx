import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MonthlyReport from '../../interfaces/MonthlyReport';
import Body from '../../components/Body';
import './Info.scss';

const Info: React.FC = () => {
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const history = useHistory();

  const path = location.pathname.split('/');
  const monthlyReportId = path[path.length - 1];

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`/api/monthlyreport/${monthlyReportId}`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if (!response.ok) {
          history.push('/app');
          return;
        }

        const result: MonthlyReport = await response.json();
        setMonthlyReport(result);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Body
      title="Monthly report information"
      subtitle="Modify your report informacion."
    >
      Info
    </Body>
  );
};

export default Info;
