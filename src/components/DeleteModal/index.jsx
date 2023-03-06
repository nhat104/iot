import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export default function DeleteModal({ open, onClose, onDelete }) {
  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle>Are you sure want to delete record?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={onDelete} variant='outlined' color='error'>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
