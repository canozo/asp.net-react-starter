import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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

  label: 'Year 2020',
  data: [65, -10, 80, 81, 56, 55, 40]
};

const History: React.FC = () => {
  const [data, setData] = useState({ labels, datasets: [dataset] });

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
