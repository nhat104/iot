import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import authApi from 'api/authApi';
import ShowAlert from 'components/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await authApi.login(Object.fromEntries(data));
      if (res.data) {
        localStorage.setItem('user_iot', JSON.stringify(res.data.user));
        navigate('/');
      }
    } catch (error) {
      setAlert({ message: 'Wrong email or password!', type: 'error' });
    }
  };

  const handleCloseAlert = (event, reason) => {
    return reason === 'clickaway' ? null : setAlert({ ...alert, message: '' });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            margin='normal'
            name='username'
            fullWidth
            label='Username'
            autoFocus
          />
          <TextField
            required
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
      <ShowAlert alert={alert} onClose={handleCloseAlert} />
    </Container>
  );
}
