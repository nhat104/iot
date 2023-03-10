import AdminLayout from 'components/layout/AdminLayout';
import UserLayout from 'components/layout/UserLayout';
import Dashboard from 'pages/Dashboard';
import DashboardUser from 'pages/DashboardUser';
import Login from 'pages/Login';
import Products from 'pages/Products';
import Users from 'pages/Users';
import { Navigate, Route, Routes } from 'react-router-dom';

const AuthRoute = ({ type = 'user', children }) => {
  const user = JSON.parse(localStorage.getItem('user_iot'));
  if (!user) {
    return <Navigate to='/login' />;
  }
  const layout = type === 'user' ? <UserLayout /> : <AdminLayout />;

  return (
    <>
      {layout}
      {children}
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthRoute type='user' />}>
        <Route path='' element={<DashboardUser />} />
        <Route path='products' element={<Products />} />
        <Route path='orders' element={<Products />} />
        <Route path='analytics' element={<Products />} />
        <Route path='categories' element={<Products />} />
        <Route path='discount' element={<Products />} />
        <Route path='inventory' element={<Products />} />
        <Route path='settings' element={<Products />} />
      </Route>
      <Route path='/admin' element={<AuthRoute type='admin' />}>
        <Route path='' element={<Dashboard />} />
        <Route path='users' element={<Users />} />
        <Route path='products' element={<Products />} />
        <Route path='orders' element={<Products />} />
        <Route path='analytics' element={<Products />} />
        <Route path='categories' element={<Products />} />
        <Route path='discount' element={<Products />} />
        <Route path='inventory' element={<Products />} />
        <Route path='settings' element={<Products />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
