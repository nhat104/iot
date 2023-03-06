import { Box, Typography } from '@mui/material';
import GradingIcon from '@mui/icons-material/Grading';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useState } from 'react';
import ShowAlert from 'components/Alert';
import checkApi from 'api/checkApi';

export default function Check() {
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleCheckIn = async () => {
    const user = JSON.parse(localStorage.getItem('iot_user'));
    try {
      const date = new Date();
      const body = { userId: user.id, date };
      const res = await checkApi.checkIn(body);
      if (res.data) {
        setAlert({ message: 'Check in success!', type: 'success' });
      }
    } catch (error) {
      setAlert({ message: 'Check in failed!', type: 'error' });
    }
  };

  const handleCheckOut = async () => {
    const user = JSON.parse(localStorage.getItem('iot_user'));
    try {
      const date = new Date();
      const body = { userId: user.id, date };
      const res = await checkApi.checkOut(body);
      if (res.data) {
        setAlert({ message: 'Check out success!', type: 'success' });
      }
    } catch (error) {
      setAlert({ message: 'Check out failed!', type: 'error' });
    }
  };

  const handleCloseAlert = (event, reason) => {
    return reason === 'clickaway' ? null : setAlert({ ...alert, message: '' });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flex: 1 }}>
      <Box
        onClick={handleCheckIn}
        sx={{ cursor: 'pointer', border: '1px solid #ccc', width: 200, height: 200 }}
      >
        <GradingIcon />
        <Typography variant='h5'>Check in</Typography>
      </Box>
      <Box
        onClick={handleCheckOut}
        sx={{ cursor: 'pointer', border: '1px solid #ccc', width: 200, height: 200 }}
      >
        <PublishedWithChangesIcon />
        <Typography variant='h5'>Check out</Typography>
      </Box>

      <ShowAlert alert={alert} onClose={handleCloseAlert} />
    </Box>
  );
}
