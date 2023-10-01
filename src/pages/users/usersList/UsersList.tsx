import { Typography } from '@mui/material';

import UserRow from '../userRow/UserRow';
import AddButton from '@src/components/AddButton';
import styles from '../users.module.css';
import { User } from '@src/entities/user';
import { useQueryClient } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useMemo } from 'react';

interface UsersListProps {
  list: User[];
  isLoading: boolean;
}

const UsersList: React.FC<UsersListProps> = ({ list: usersData, isLoading }) => {
  const queryClient = useQueryClient();

  const handleAddNewUser = () => {
    const newItem = {
      id: `temp_${(+new Date()).toString()}`,
      name: '',
      country: '',
      email: '',
      phone: '',
    };

    queryClient.setQueryData<User[]>('users', (prevItems) => {
      return [newItem, ...(prevItems || [])];
    });
  };

  const amountOfUsers = useMemo(
    () => usersData.filter((user) => !user.id.startsWith('temp_')).length,
    [usersData]
  );

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({amountOfUsers})</Typography>
        <AddButton disabled={false} handleClick={handleAddNewUser} />
      </div>
      <div className={styles.usersListContent}>
        {(isLoading && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        )) ||
          usersData.map((user) => <UserRow key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default UsersList;
