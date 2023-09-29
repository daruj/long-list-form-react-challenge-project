import { Typography } from '@mui/material';
import countryOptions from '@src/data/countries.json';
import UserRow from '../userRow/UserRow';
import AddButton from '@src/components/AddButton';
import styles from '../users.module.css';
import { User } from '@src/entities/user';
import { useQueryClient } from 'react-query';

interface UsersListProps {
  list: User[];
}

const UsersList: React.FC<UsersListProps> = ({ list: usersData }) => {
  const queryClient = useQueryClient();

  const handleAddNewUser = () => {
    queryClient.setQueryData<User[]>('users', (prevItems) => {
      return [
        {
          id: `temp_${(+new Date()).toString()}`,
          name: '',
          country: countryOptions[0],
          email: '',
          phone: '',
        },
        ...(prevItems || []),
      ];
    });
  };
  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({usersData.length})</Typography>
        <AddButton disabled={false} handleClick={handleAddNewUser} />
      </div>
      <div className={styles.usersListContent}>
        {usersData.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
