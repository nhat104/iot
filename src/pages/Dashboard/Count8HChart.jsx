import { Box } from '@mui/material';
import statisticApi from 'api/statisticApi';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export default function Count8HChart() {
  const [options, setOptions] = useState({
    chart: { id: 'statistic-by-week' },
    xaxis: { categories: [] },
    yaxis: { labels: { formatter: (val) => val.toFixed(0) } },
  });

  const [series, setSeries] = useState([
    {
      name: 'employees',
      data: [],
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const res = await statisticApi.getByWeek();
        if (res.data) {
          setOptions({ ...options, xaxis: { categories: res.data.dateArr } });
          setSeries([{ name: 'employees', data: res.data.gte8Hs }]);
        }
      } catch (error) {
        // setAlert({ message: 'Wrong email or password!', type: 'error' });
      }
    })();
  }, []);

  return (
    <Box>
      <Chart options={options} series={series} type='bar' width='800' />
    </Box>
  );
}
