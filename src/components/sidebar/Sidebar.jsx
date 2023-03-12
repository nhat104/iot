import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import logo from 'assets/images/logo.png';

const SidebarItem = (props) => {
  const active = props.active ? 'active' : '';

  return (
    <div className='sidebar__item'>
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user_iot'));
  const sidebar_items = [
    {
      display_name: 'Dashboard',
      route: '/admin',
      icon: 'bx bx-category-alt',
      show: user.role === 'admin',
    },
    {
      display_name: 'Dashboard',
      route: '/',
      icon: 'bx bx-category-alt',
      show: user.role === 'employee',
    },
    {
      display_name: 'Users',
      route: '/admin/users',
      icon: 'bx bx-user-pin',
      show: user.role === 'admin',
    },
    {
      display_name: 'Products',
      route: '/products',
      icon: 'bx bx-package',
      show: false,
    },
    {
      display_name: 'Orders',
      route: '/orders',
      icon: 'bx bx-cart',
      show: false,
    },
    {
      display_name: 'Analytics',
      route: '/analytics',
      icon: 'bx bx-bar-chart-alt',
      show: false,
    },
    {
      display_name: 'categories',
      route: '/categories',
      icon: 'bx bx-list-ol',
      show: false,
    },
    {
      display_name: 'discount',
      route: '/discount',
      icon: 'bx bx-gift',
      show: false,
    },
    {
      display_name: 'inventory',
      route: '/inventory',
      icon: 'bx bx-store-alt',
      show: false,
    },
    {
      display_name: 'settings',
      route: '/settings',
      icon: 'bx bx-cog',
      show: false,
    },
  ];

  const activeItem = sidebar_items.findIndex((item) => item.route === location.pathname);

  return (
    <div className='sidebar'>
      <div className='sidebar__logo'>
        <img src={logo} alt='company logo' />
      </div>
      {sidebar_items.map(
        (item, index) =>
          item.show && (
            <Link to={item.route} key={index}>
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={index === activeItem}
              />
            </Link>
          )
      )}
    </div>
  );
};

export default Sidebar;
