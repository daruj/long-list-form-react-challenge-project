import { Autocomplete, TextField } from '@mui/material';
import countryOptions from '@src/data/countries.json';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

interface CountrySelectProps {
  value: string;
  error: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  error,
  onChange,
  onKeyDown,
}) => {
  return (
    <StyledAutocomplete
      options={countryOptions}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            onChange={onChange}
            error={error}
            placeholder="Select Country"
            onKeyDown={onKeyDown}
          />
        );
      }}
      onChange={(_, values) => {
        if (values !== null) onChange(values);
      }}
      freeSolo
      isOptionEqualToValue={(option, value) => option === value}
      value={value || null}
    />
  );
};

export default CountrySelect;
