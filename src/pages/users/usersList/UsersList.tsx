import { Typography } from '@mui/material';

import UserRow from '../userRow/UserRow';
import AddButton from '@src/components/AddButton';
import styles from '../users.module.css';
import { User } from '@src/entities/user';

interface UsersListProps {
  list: User[];
}

const UsersList: React.FC<UsersListProps> = ({ list: usersData }) => {
  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        <AddButton disabled={false} handleClick={() => null} />
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
