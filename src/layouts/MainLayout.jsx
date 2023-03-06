import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

export default function MainLayout() {
  const user = JSON.parse(localStorage.getItem('iot_user'));

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {user.role === 'admin' && <SideBar />}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
}
