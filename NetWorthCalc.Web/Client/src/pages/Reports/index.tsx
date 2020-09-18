import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Body from '../../components/Body';
import { MonthlyReportInfo } from '../../interfaces/MonthlyReport';
import './Reports.scss';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Reports: React.FC = () => {
  const [monthlyReports, setMonthlyReports] = useState<Array<MonthlyReportInfo>>([]);
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch('/api/monthlyreport', {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        const result: Array<MonthlyReportInfo> = await response.json();
        setMonthlyReports(result);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []); // eslint-disable-line

  const deleteReport = async () => {

  };

  const dateTime = (date: Date): string => {
    // return `${date.toDateString()} ${date.toTimeString()}`;
    return date.toDateString();
  };

  return (
    <Body
      title="All saved reports"
      subtitle="Modify and delete past reports in case you made a mistake."
    >
      <div className="d-flex flex-column align-items-start">
        {monthlyReports.map(monthlyReport => (
          <div key={monthlyReport.monthlyReportId} className="container report">
            <div className="row mb-1">
              <div className="col-lg">
                <b>Year: </b>
                {monthlyReport.year}
              </div>
              <div className="col-lg">
                <b>Month: </b>
                {months[monthlyReport.month - 1]}
              </div>
              <div className="col-lg">
                <b>Created On: </b>
                {dateTime(new Date(monthlyReport.createdOn))}
              </div>
            </div>
            <div className="d-flex justify-content-evenly align-items-center">
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={() => history.push(`/app/info/${monthlyReport.monthlyReportId}`)}
              >
                View and modify
              </button>
              <button type="button" className="btn btn-danger mx-1" onClick={deleteReport}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Body>
  );
};

export default Reports;
