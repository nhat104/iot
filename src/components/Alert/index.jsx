import { Alert, Snackbar } from '@mui/material';

export default function ShowAlert({ alert, onClose }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(alert.message)}
      autoHideDuration={2000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={alert.type || undefined} sx={{ width: '100%' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
