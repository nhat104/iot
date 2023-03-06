import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const userLogin = JSON.parse(localStorage.getItem('iot_user'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('iot_user');
    navigate('/login');
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', height: 60, alignItems: 'center', borderBottom: '1px solid #ccc' }}>
      <Box sx={{ flex: 1, px: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5'>IoT</Typography>
        <Box>
          <Tooltip placement='left' title='More info'>
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider orientation='vertical' />
      <Box sx={{ width: 60, mx: 3 }}>
        <IconButton onClick={handleClick}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem disableRipple sx={{ minWidth: '240px', display: 'block', cursor: 'default' }}>
            <Typography>Name: {userLogin.fullName}</Typography>
            <Typography>Role: {userLogin.role}</Typography>
          </MenuItem>
          <MenuItem sx={{ borderTop: '1px solid #ccc' }} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
