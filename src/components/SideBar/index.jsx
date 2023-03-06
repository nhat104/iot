import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const navigate = useNavigate();

  const handleSideBar = (link) => {
    navigate(link);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 280, borderRight: '1px solid #ccc' }}>
      <List disablePadding>
        {sideBars.map((navBar, index) => (
          <ListItem onClick={() => handleSideBar(navBar.link)} key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={navBar.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const sideBars = [
  {
    name: 'Dashboard',
    link: '/home',
  },
  {
    name: 'User',
    link: '/user',
  },
];
