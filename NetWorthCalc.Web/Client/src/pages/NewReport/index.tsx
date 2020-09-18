import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MonthlyReport from '../../interfaces/MonthlyReport';
import Body from '../../components/Body';
import './NewReport.scss'

const NewReport: React.FC = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const changeMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    if (number >= 0 && number < 12) {
      setMonth(number);
    }
  };

  const changeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    if (number > 1 && number < 9999) {
      setYear(number);
    }
  };

  const createReport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const body = {
        Month: Number(month) + 1,
        Year: Number(year),
      };

      const response = fetch('/api/monthlyreport', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result: MonthlyReport = await response.then(res => res.json());
      history.push(`/app/info/${result.monthlyReportId}`);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Body
      title="Create a monthly report"
      subtitle="Monthly reports help you keep a history of your net worth, create a new one here!"
    >
      <div className="container mt-5">
        <form onSubmit={createReport}>
          <div className="row">
            <div className="col-lg mt-3">
              {/* Month */}
              <label htmlFor="inputMonth" className="form-label">Month</label>
              <input
                type="number"
                id="inputMonth"
                className="form-control"
                aria-describedby="monthHelpBlock"
                value={month}
                onChange={changeMonth}
              />
              <div id="monthHelpBlock" className="form-text">
                Select the month that you're about to save information about.
              </div>
            </div>
            <div className="col-lg mt-3">
              {/* Year */}
              <label htmlFor="inputYear" className="form-label">Year</label>
              <input
                type="number"
                id="inputYear"
                className="form-control"
                aria-describedby="yearHelpBlock"
                value={year}
                onChange={changeYear}
              />
              <div id="yearHelpBlock" className="form-text">
                Select the year that you're about to save information about.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">
              <button type="submit" className="btn btn-primary">Create report</button>
            </div>
          </div>
        </form>
      </div>
    </Body>
  );
};

export default NewReport;
