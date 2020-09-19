import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Line } from 'react-chartjs-2';
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
    getData();
  }, [year]); // eslint-disable-line

  return (
    <Body
      title="Net worth history"
      subtitle="See how your net worth has changed over the last year."
    >
      <Line data={data} />
    </Body>
  );
};

export default History;
