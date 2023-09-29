import { Grid } from '@mui/material';
// import InputField from '../../../components/InputField';
// import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';
import type { User } from '@src/entities/user';
// user country must be one of those - for select/autocomplete implementation
// import countryOptions from '../../../data/countries.json';

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = () => {
  return (
    <Grid container className={styles.userRow}>
      {/* Render each user row inputs and trash icon at the end of each row */}
      {/* <TrashIconButton /> */}
    </Grid>
  );
};

export default UserRow;
