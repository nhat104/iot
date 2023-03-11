import statisticApi from 'api/statisticApi';
import statusCards from 'assets/JsonData/status-card-data.json';
import Count8HChart from 'components/Count8HChart';
import StatusCard from 'components/status-card/StatusCard';
import Table from 'components/table/Table';
import WorkHourChart from 'components/WorkHourChart';
import { useEffect, useState } from 'react';

const renderCheckHead = (item, index) => <th key={index}>{item}</th>;

const renderCheckBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.date}</td>
  </tr>
);

const Dashboard = () => {
  const [latestCheckIn, setLatestCheckIn] = useState({
    head: ['id', 'user', 'Time'],
    body: [],
  });

  const [latestCheckOut, setLatestCheckOut] = useState({
    head: ['id', 'user', 'Time'],
    body: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await statisticApi.latestCheckIn(5);
        if (res.data) {
          const body = res.data.map((item) => ({
            id: item.id,
            user: item?.user?.fullName,
            date: new Date(item.date).toLocaleString(),
          }));
          setLatestCheckIn({ ...latestCheckIn, body });
        }
      } catch (error) {
        // setAlert({ message: 'Wrong email or password!', type: 'error' });
      }

      try {
        const res = await statisticApi.latestCheckOut(5);
        if (res.data) {
          const body = res.data.map((item) => ({
            id: item.id,
            user: item?.user?.fullName,
            date: new Date(item.date).toLocaleString(),
          }));
          setLatestCheckOut({ ...latestCheckOut, body });
        }
      } catch (error) {
        // setAlert({ message: 'Wrong email or password!', type: 'error' });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='row'>
        {/* total employee */}
        {/* total employee work 8 hour a day in week */}
        {/* <div className='col-6'>
          <div className='row'>
            {statusCards.map((item, index) => (
              <div className='col-6' key={index}>
                <StatusCard icon={item.icon} count={item.count} title={item.title} />
              </div>
            ))}
          </div>
        </div> */}
        <div className='col-6'>
          <div className='card full-height'>
            {/* chart */}
            <Count8HChart />
          </div>
        </div>
        <div className='col-6'>
          <div className='card full-height'>
            {/* chart */}
            <WorkHourChart />
          </div>
        </div>
        <div className='col-6'>
          <div className='card'>
            <div className='card__header'>
              <h3>Latest check in</h3>
            </div>
            <div className='card__body'>
              {latestCheckIn.body.length && (
                <Table
                  headData={latestCheckIn.head}
                  renderHead={(item, index) => renderCheckHead(item, index)}
                  bodyData={latestCheckIn.body}
                  renderBody={(item, index) => renderCheckBody(item, index)}
                />
              )}
            </div>
            {/* <div className='card__footer'>
              <Link to='/'>view all</Link>
            </div> */}
          </div>
        </div>
        <div className='col-6'>
          <div className='card'>
            <div className='card__header'>
              <h3>latest check out</h3>
            </div>
            <div className='card__body'>
              {latestCheckOut.body.length && (
                <Table
                  headData={latestCheckOut.head}
                  renderHead={(item, index) => renderCheckHead(item, index)}
                  bodyData={latestCheckOut.body}
                  renderBody={(item, index) => renderCheckBody(item, index)}
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

export default Dashboard;
