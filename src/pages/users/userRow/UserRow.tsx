import { Grid } from '@mui/material';
import InputField from '@src/components/InputField';
// import TrashIconButton from '../../../components/TrashIconButton';

import styles from '../users.module.css';
import type { User } from '@src/entities/user';
import React from 'react';
// user country must be one of those - for select/autocomplete implementation
// import countryOptions from '../../../data/countries.json';

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  return (
    <Grid container className={styles.userRow}>
      <Grid item xs={3} padding={1}>
        <InputField
          placeholder="Enter the name..."
          name="name"
          value={user.name}
          onChangeHandler={() => {}}
        />
      </Grid>
      <Grid item xs={3} padding={1}>
        <InputField
          placeholder="Enter the email..."
          name="email"
          value={user.email}
          onChangeHandler={() => {}}
        />
      </Grid>
      <Grid item xs={3} padding={1}>
        <InputField
          placeholder="Enter the country..."
          name="country"
          value={user.country}
          onChangeHandler={() => {}}
        />
      </Grid>
      <Grid item xs={3} padding={1}>
        <InputField
          placeholder="Enter the phone..."
          name="phone"
          value={user.phone}
          onChangeHandler={() => {}}
        />
      </Grid>
      {/* Render each user row inputs and trash icon at the end of each row */}
      {/* <TrashIconButton /> */}
    </Grid>
  );
};

export default React.memo(UserRow);
