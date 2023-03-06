/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import ShowAlert from 'components/Alert';
import DeleteModal from 'components/DeleteModal';
import Loading from 'components/Loading';
import Table from 'components/Table';
import { useEffect, useState } from 'react';
import AddEdit from './components/AddEdit';

export default function UserManagement() {
  const [modalMode, setModalMode] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    userId: '',
    name: '',
    email: '',
    role: '',
    password: '',
    rePassword: '',
  });

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
  }, [modalMode]);

  const handleClose = () => {
    setModalMode('');
  };

  const handleAddUser = () => {
    setUser({ fullName: '', username: '', password: '', rePassword: '' });
    setModalMode('add');
  };

  const handleFilter = () => {
    setUser({ name: '', email: '' });
    setModalMode('filter');
  };

  const handleEditUser = (row) => {
    setUser({
      id: row.id,
      fullName: row.fullName,
      username: row.username,
      password: '',
      rePassword: '',
    });
    setModalMode('edit');
  };

  const openDeleteModal = (row) => {
    setUser({ id: row.id });
    setModalMode('delete');
  };

  const handleDeleteUser = async () => {
    try {
      const resDelete = await userApi.delete(user.id);
      if (resDelete.status === 200) {
        setAlert({ message: 'Delete user successfully!', type: 'success' });
        setModalMode('');
      }
    } catch (error) {
      setLoading(false);
      setAlert({ message: 'Get users failed!', type: 'error' });
    }
  };

  const handleCloseAlert = (event, reason) => {
    return reason === 'clickaway' ? null : setAlert({ ...alert, message: '' });
  };

  const actions = [
    { name: 'Edit', click: handleEditUser },
    { name: 'Delete', click: openDeleteModal },
  ];

  const head = ['User ID', 'Name', 'Username', 'Role'];
  const table = { head, body: listUser };

  return (
    <Box sx={{ p: 4, flex: 1, bgcolor: '#eee' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h5'>User Management</Typography>
            <Box>
              <Button sx={{ mr: 2 }} variant='contained' onClick={handleAddUser}>
                New User
              </Button>
              <Button variant='contained' onClick={handleFilter}>
                Filter
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Table table={table} checkbox={false} actions={actions} />
          </Box>
        </>
      )}
      <AddEdit mode={modalMode} initialValues={user} onClose={handleClose} setAlert={setAlert} />
      <DeleteModal
        open={modalMode === 'delete'}
        onClose={handleClose}
        onDelete={handleDeleteUser}
      />
      {/* <Filter mode={modalMode} initialValues={user} onClose={handleClose} /> */}
      <ShowAlert alert={alert} onClose={handleCloseAlert} />
    </Box>
  );
}
