import { Grid } from '@mui/material';
import InputField from '@src/components/InputField';
import TrashIconButton from '@src/components/TrashIconButton';

import styles from '../users.module.css';
import type { User } from '@src/entities/user';
import React from 'react';
import CountrySelect from '@src/components/CountrySelect';

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  return (
    <Grid container className={styles.userRow}>
      <Grid item xs={11}>
        <Grid container>
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
            <CountrySelect value={user.country} />
          </Grid>
          <Grid item xs={3} padding={1}>
            <InputField
              placeholder="Enter the phone..."
              name="phone"
              value={user.phone}
              onChangeHandler={() => {}}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <TrashIconButton />
      </Grid>
    </Grid>
  );
};

export default React.memo(UserRow);
