import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, Grid, IconButton, Typography } from '@mui/material';
import { InputField, SelectField } from 'components/FormFields';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { filterUser } from '../userSlice';

export default function Filter({ mode, onClose, initialValues }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const dispatch = useDispatch();

  const handleUserFormSubmit = async (formValues) => {
    dispatch(filterUser({ data: { full_name: formValues.name, email: formValues.email } }));
    onClose();
  };

  return (
    <Dialog
      maxWidth='lg'
      sx={{ '& .MuiDialog-paper': { height: '80%' } }}
      fullWidth
      onClose={onClose}
      open={mode === 'filter'}
    >
      <Box
        component='form'
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(handleUserFormSubmit)}
      >
        <Box sx={{ p: 4, flex: 1 }}>
          <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant='h5' sx={{ mb: 6 }}>
            Filter
          </Typography>

          <Grid container rowSpacing={4} columnSpacing={12}>
            {fields.map((field) => (
              <Grid item key={field.name} xs={6}>
                <Typography>{field.label}</Typography>
                {field.type === 'select' ? (
                  <SelectField name={field.name} control={control} options={field.options} />
                ) : (
                  <InputField name={field.name} control={control} type={field.type || 'text'} />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
        <DialogActions>
          <Button type='submit' variant='contained' sx={{ mr: 1, mb: 1 }} disabled={isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
];
