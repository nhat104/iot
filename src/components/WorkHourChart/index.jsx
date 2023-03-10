import { Box, Typography } from '@mui/material';
import statisticApi from 'api/statisticApi';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

export default function WorkHourChart() {
  const [options, setOptions] = useState({
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
    xaxis: { categories: [] },
    yaxis: { labels: { formatter: (val) => val.toFixed(0) } },
  });

  const [series, setSeries] = useState([
    {
      name: 'work hours',
      data: [],
    },
  ]);

  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Work hours by week
      </Typography>
      <Chart
        options={
          themeReducer === 'theme-mode-dark'
            ? { ...options, theme: { mode: 'dark' } }
            : { ...options, theme: { mode: 'light' } }
        }
        series={series}
        type='bar'
      />
    </Box>
  );
}
