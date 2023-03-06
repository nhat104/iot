import { Box } from '@mui/material';
import Count8HChart from './Count8HChart';
import WorkHourChart from './WorkHourChart';

export default function Dashboard() {
  return (
    <Box sx={{ p: 5 }}>
      <Count8HChart />
      <WorkHourChart />
    </Box>
  );
}
