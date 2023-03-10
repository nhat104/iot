import React, { useEffect, useState } from 'react';
import Table from '../components/table/Table';
import Loading from '../components/Loading';
import ShowAlert from '../components/Alert';
import userApi from 'api/userApi';

const customerTableHead = ['User ID', 'name', 'username', 'role'];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.fullName}</td>
    <td>{item.username}</td>
    <td>{item.role}</td>
  </tr>
);

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await userApi.list();
        setListUser(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({ message: 'Get users failed!', type: 'error' });
      }
    })();
  }, []);

  const handleCloseAlert = (_, reason) => {
    return reason === 'clickaway' ? null : setAlert({ ...alert, message: '' });
  };

  return (
    <div>
      <h2 className='page-header'>Users</h2>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              {loading ? (
                <Loading />
              ) : (
                <Table
                  limit='10'
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={listUser}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ShowAlert alert={alert} onClose={handleCloseAlert} />
    </div>
  );
};

export default Users;
