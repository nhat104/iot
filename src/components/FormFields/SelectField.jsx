import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

// export interface RadioOption {
//   label?: string;
//   value: number | string;
// }

// export interface SelectFieldProps {
//   name: string;
//   control: Control<any>;
//   label?: string;
//   disabled?: boolean;
//   options: RadioOption[];
// }

export default function SelectField({ name, control, disabled, options, ...selectProps }) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl
      disabled={disabled}
      margin='dense'
      component='fieldset'
      error={Boolean(error)}
      fullWidth
      variant='outlined'
      size='small'
      sx={selectProps.sx}
    >
      <Select
        labelId={`${name}_label`}
        value={value}
        onOpen={selectProps?.onOpen}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
