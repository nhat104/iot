import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

export default function InputField({ name, control, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      size={inputProps.size || 'small'}
      margin={inputProps.margin || 'dense'}
      label={inputProps.label}
      variant='outlined'
      inputRef={ref}
      error={Boolean(error)}
      helperText={error?.message}
      disabled={inputProps.disabled}
      inputProps={inputProps}
    />
  );
}
