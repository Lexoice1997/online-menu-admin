import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Statistics.module.css';

function Statistics() {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  console.log(data);
  const config: any = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    annotations: [
      // 低于中位数颜色变化
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#F4664A',
      },
      {
        type: 'text',
        position: ['min', 'median'],
        content: 'Средний прибыль',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <div className={styles.statistics}>
      <div className={styles.stat}>
        <Line {...config} />
      </div>
    </div>
  );
}

export default Statistics;
