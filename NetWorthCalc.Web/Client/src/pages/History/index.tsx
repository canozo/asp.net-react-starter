import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Line } from 'react-chartjs-2';
import { ArrowLeft, ArrowRight } from 'react-feather';
import YearlyReport from '../../interfaces/YearlyReport';
import Body from '../../components/Body';
import './History.scss';

const labels = [
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

const cyan = 'rgba(75,192,192,1)';
const cyanTransparent = 'rgba(75,192,192,0.4)';
const grey = 'rgba(220,220,220,1)';

const dataset = {
  lineTension: 0.1,
  backgroundColor: cyanTransparent,
  borderColor: cyan,
  pointBorderColor: cyan,
  pointBackgroundColor: 'white',
  pointHoverRadius: 5,
  pointHoverBackgroundColor: cyan,
  pointHoverBorderColor: grey,
  pointHoverBorderWidth: 2,
  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const History: React.FC = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [data, setData] = useState({
    labels,
    datasets: [{
      ...dataset,
      label: `Year ${year}`,
    }]
  });
  const loading = useRef(true);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/yearlyreport/report/${year}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const resData: Array<YearlyReport> = await response.json();
        loading.current = false;
        setData({
          labels,
          datasets: [{
            ...dataset,
            label: `Year ${year}`,
            data: resData.map(item => item.total),
          }],
        });
      }
    };
    loading.current = true;
    getData();
  }, [year]); // eslint-disable-line

  return (
    <Body
      title="Net worth history"
      subtitle="See how your net worth has changed over the last year."
    >
      <div className="container">
        <div className="row">
          <div className="col">
            <b>Selected year: </b> {year}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-dark mx-1" onClick={() => setYear(year - 1)}>
              <ArrowLeft />
            </button>
            <button type="button" className="btn btn-dark mx-1" onClick={() => setYear(year + 1)}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <Line data={data} />
    </Body>
  );
};

export default History;
