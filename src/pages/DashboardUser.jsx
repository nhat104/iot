/* eslint-disable react-hooks/exhaustive-deps */
import userApi from 'api/userApi';
import Table from 'components/table/Table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const renderUserHead = (item, index) => <th key={index}>{item}</th>;

const renderUserBody = (item, index) => (
  <tr key={index}>
    <td>{item?.date}</td>
    <td>{item?.checkIn}</td>
    <td>{item?.checkOut}</td>
    <td>{item?.workHour}</td>
  </tr>
);

const DashboardUser = () => {
  const [userTable, setUserTable] = useState({
    head: ['Date', 'Check in', 'Check out', 'Work hour'],
    body: [],
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user_iot'));

  useEffect(() => {
    if (user.role === 'admin') {
      navigate('/admin');
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.statisticByWeek({ userId: user?.id });
        if (res.data) {
          setUserTable({ ...userTable, body: res.data });
        }
      } catch (error) {
        // setAlert({ message: 'Wrong email or password!', type: 'error' });
      }
    })();
    return () => {
      setUserTable({ ...userTable, body: [] });
    };
  }, []);

  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='row'>
        <div className='col-6'>
          <div className='card'>
            <div className='card__header'>
              <h3>Statistic by week</h3>
            </div>
            <div className='card__body'>
              {userTable.body.length && (
                <Table
                  headData={userTable.head}
                  renderHead={(item, index) => renderUserHead(item, index)}
                  bodyData={userTable.body}
                  renderBody={(item, index) => renderUserBody(item, index)}
                />
              )}
            </div>
            {/* <div className='card__footer'>
              <Link to='/'>view all</Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
