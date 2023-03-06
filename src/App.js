import MainLayout from 'layouts/MainLayout';
import Check from 'pages/Check';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import UserManagement from 'pages/UserManagement';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

const AuthRoute = ({ type = 'private', children }) => {
  const user = JSON.parse(localStorage.getItem('iot_user'));
  if (type === 'private' && !user) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <MainLayout />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthRoute type='private' />}>
        <Route
          path=''
          element={
            <Navigate
              to={
                JSON.parse(localStorage.getItem('iot_user'))?.role === 'admin' ? '/home' : 'check'
              }
            />
          }
        />
        <Route path='/home' element={<Dashboard />} />
        <Route path='/check' element={<Check />} />
        <Route path='/user' element={<UserManagement />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
