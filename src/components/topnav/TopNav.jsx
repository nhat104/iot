import { Box } from '@mui/material';
import user_image from 'assets/images/tuat.png';
import user_menu from 'assets/JsonData/user_menus.json';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown';
import ThemeMenu from '../thememenu/ThemeMenu';
import './topnav.css';

const renderUserToggle = (user) => (
  <div className='topnav__right-user'>
    <div className='topnav__right-user__image'>
      <img src={user.image} alt='' />
    </div>
    <div className='topnav__right-user__name'>{user.display_name}</div>
  </div>
);

const Topnav = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user_iot'));

  const handleLogout = () => {
    localStorage.removeItem('user_iot');
    navigate('/login');
  };

  const curr_user = {
    display_name: user?.username || 'Admin',
    image: user_image,
  };

  const renderUserMenu = (item, index) => (
    <Box
      key={index}
      onClick={() => index === user_menu.length - 1 && handleLogout()}
      sx={{ cursor: 'pointer' }}
    >
      <div className='notification-item'>
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Box>
  );
  return (
    <div className='topnav'>
      <div className='topnav__search'>
        <input type='text' placeholder='Search here...' />
        <i className='bx bx-search'></i>
      </div>
      <div className='topnav__right'>
        <div className='topnav__right-item'>
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        {/* <div className='topnav__right-item'>
          <Dropdown
            icon='bx bx-bell'
            badge='12'
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to='/'>View All</Link>}
          />
        </div> */}
        <div className='topnav__right-item'>
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
