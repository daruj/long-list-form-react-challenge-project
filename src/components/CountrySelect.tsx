import Autocomplete from '@mui/material/Autocomplete';
import countryOptions from '@src/data/countries.json';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
  '& input': {
    padding: '0 14px !important',
  },
});

interface CountrySelectProps {
  value: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value }) => {
  return (
    <StyledAutocomplete
      options={countryOptions}
      disableCloseOnSelect
      renderInput={(params) => <TextField {...params} />}
      value={value}
    />
  );
};

export default CountrySelect;
