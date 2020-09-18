import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Body from '../../components/Body';
import './History.scss';

const History: React.FC = () => {
  const [data, setData] = useState({});

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
