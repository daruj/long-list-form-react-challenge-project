import { Grid } from '@mui/material';
import InputField from '@src/components/InputField';
import TrashIconButton from '@src/components/TrashIconButton';

import styles from '../users.module.css';
import type { User } from '@src/entities/user';
import React from 'react';
import CountrySelect from '@src/components/CountrySelect';
import { useMutation, useQueryClient } from 'react-query';
import { removeUser } from '@src/api/users.api';

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const handleRemoveUserMutation = useMutation({
    mutationFn: removeUser,

    onMutate: async (itemId) => {
      // Store the current list of items in case the mutation fails
      await queryClient.cancelQueries('users'); // Cancel the list query to prevent a race condition
      const previousItems = queryClient.getQueryData<User[]>('users');

      // Optimistically remove the item from the list if previousItems is defined
      queryClient.setQueryData<User[]>('users', (prevItems) => {
        return prevItems?.filter((item) => item.id !== itemId) || [];
      });

      return { previousItems };
    },
    onError: (error, variables, context) => {
      // If the mutation fails, revert to the previous list of items
      const previousItems = context?.previousItems || [];
      queryClient.setQueryData('users', previousItems);
    },
  });

  const handleRemove = () => {
    // if the user is not stored yet, then we just want to remove it from the list
    if (user.id.startsWith('temp_')) {
      queryClient.setQueryData<User[]>('users', (prevItems) => {
        return prevItems?.filter((item) => item.id !== user.id) || [];
      });
    } else {
      handleRemoveUserMutation.mutate(user.id);
    }
  };

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
        <TrashIconButton onClick={handleRemove} />
      </Grid>
    </Grid>
  );
};

export default React.memo(UserRow);
