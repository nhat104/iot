import { Box, Typography } from '@mui/material';
import statisticApi from 'api/statisticApi';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export default function WorkHourChart() {
  const [options, setOptions] = useState({
    chart: { id: 'work-hour-by-week' },
    xaxis: { categories: [] },
    yaxis: { labels: { formatter: (val) => val.toFixed(0) } },
  });

  const [series, setSeries] = useState([
    {
      name: 'work hours',
      data: [],
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const res = await statisticApi.getWorkHoursByWeek();
        if (res.data) {
          setOptions({ ...options, xaxis: { categories: res.data.dateArr } });
          setSeries([{ name: 'work hours', data: res.data.workHours }]);
        }
      } catch (error) {
        // setAlert({ message: 'Wrong email or password!', type: 'error' });
      }
    })();
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Work hours by week
      </Typography>
      <Chart options={options} series={series} type='bar' width='800' />
    </Box>
  );
}
