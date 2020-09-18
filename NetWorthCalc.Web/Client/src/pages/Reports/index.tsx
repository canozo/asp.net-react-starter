import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Body from '../../components/Body';
import { MonthlyReportInfo } from '../../interfaces/MonthlyReport';
import './Reports.scss';

const Reports: React.FC = () => {
  const [monthlyReports, setMonthlyReports] = useState<Array<MonthlyReportInfo>>([]);
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  return (
    <Body
      title="All saved reports"
      subtitle="Modify and delete past reports in case you made a mistake."
    >
      Reports
    </Body>
  );
};

export default Reports;
