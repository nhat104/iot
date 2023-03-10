import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ThemeAction from 'redux/actions/ThemeAction';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import './layout.css';

const UserLayout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');
    const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');
    dispatch(ThemeAction.setMode(themeClass));
    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  return (
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
      <Sidebar />
      <div className='layout__content'>
        <TopNav />
        <div className='layout__content-main'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
