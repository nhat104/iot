import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import userApi from 'api/userApi';
import { useState } from 'react';

export default function AddEdit({ mode, onClose, initialValues, setAlert }) {
  const [valueSelect, setValueSelect] = useState('');

  const handleChange = (event) => {
    setValueSelect(event.target.value);
  };

  const handleUserFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const fullName = data.get('fullName');
    const password = data.get('password');
    const rePassword = data.get('rePassword');
    if (password !== rePassword) {
      setAlert({ message: 'Password not match!', type: 'error' });
      return;
    }
    if (!initialValues.id) {
      try {
        const res = await userApi.add({ username, fullName, password });
        if (res.status === 200) {
          onClose();
          setAlert({ message: 'Add user successfully!', type: 'success' });
        } else {
          setAlert({ message: res.error, type: 'error' });
        }
      } catch (error) {
        setAlert({ message: 'Add user failed!', type: 'error' });
      }
    } else {
      try {
        const res = await userApi.edit({
          id: initialValues.id,
          body: { username, fullName, password },
        });
        if (res.status === 200) {
          onClose();
          setAlert({ message: 'Edit user successfully!', type: 'success' });
        } else {
          setAlert({ message: res.error, type: 'error' });
        }
      } catch (error) {
        setAlert({ message: 'Edit user failed!', type: 'error' });
      }
    }
  };

  const fields = [
    // { name: 'userId', required: true, label: 'User ID' },
    { name: 'username', required: true, label: 'Username' },
    { name: 'fullName', required: true, label: 'Full Name' },
    // { name: 'email', required: true, label: 'Email', type: 'email' },
    // {
    //   name: 'role',
    //   required: true,
    //   label: 'Role',
    //   type: 'select',
    //   options: [
    //     { value: 'Admin', label: 'Admin' },
    //     { value: 'Editor', label: 'Editor' },
    //   ],
    // },
    { name: 'password', required: mode === 'add', label: 'Password', type: 'password' },
    { name: 'rePassword', required: mode === 'add', label: 'Re-type Password', type: 'password' },
  ];

  return (
    <Dialog maxWidth='md' fullWidth onClose={onClose} open={mode === 'add' || mode === 'edit'}>
      <form onSubmit={handleUserFormSubmit}>
        <Box sx={{ p: 4, flex: 1 }}>
          <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant='h5' sx={{ mb: 6 }}>
            {mode === 'edit' ? 'Edit user' : 'Add new user'}
          </Typography>

          <Grid container rowSpacing={4} columnSpacing={12}>
            {fields.map((field) => (
              <Grid item key={field.name} xs={6}>
                {field.type === 'select' ? (
                  <FormControl fullWidth>
                    <InputLabel>Age</InputLabel>
                    <Select
                      id='demo-simple-select'
                      value={valueSelect}
                      label='Age'
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    defaultValue={initialValues[field.name] || ''}
                    name={field.name}
                    required={field.required}
                    label={field.label}
                    variant='outlined'
                    type={field.type}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
        <DialogActions>
          <Button type='submit' variant='contained' sx={{ mr: 1, mb: 1 }}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
