import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import React from 'react';

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

interface InputFieldProps {
  name: string;
  value: string;
  onChangeHandler(name: string, value: string): void;
  error: boolean;
  disabled: boolean;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  onChangeHandler,
  error,
  disabled,
  placeholder,
}) => {
  return (
    <StyledTextField
      name={name}
      value={value}
      onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
      error={error}
      disabled={disabled}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
      autoComplete="off"
      inputProps={{
        autoComplete: 'off',
      }}
    />
  );
};

// TODO: Implement passed props
InputField.defaultProps = {
  name: 'text_field_name',
  value: '',
  onChangeHandler: () => {},
  error: false,
  disabled: false,
  placeholder: '',
};

export default InputField;
