import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { useQuery } from 'react-query';
import { fetchUsers } from '@src/api/users.api';
import CircularProgress from '@mui/material/CircularProgress';

import ContentContainer from '@src/components/ContentContainer';

function UsersPage() {
  const { data, isSuccess, isError, isLoading, refetch } = useQuery('users', fetchUsers, {
    refetchOnWindowFocus: false,
  });

  const handleRefetch = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    refetch();
  };

  if (isLoading) {
    return (
      <ContentContainer>
        <CircularProgress />
      </ContentContainer>
    );
  }

  if (isError)
    return (
      <ContentContainer>
        <span>
          We were not able to retrieve the list of users, please{' '}
          <a href="/#" onClick={handleRefetch}>
            try refetching
          </a>
        </span>
      </ContentContainer>
    );

  if (isSuccess && data) {
    return (
      <ContentContainer>
        <>
          <UsersList list={data} />
          <div className={styles.rightButtonContainer}>
            <PrimaryButton disabled={false} handleClick={() => null}>
              <span>Save</span>
            </PrimaryButton>
          </div>
        </>
      </ContentContainer>
    );
  }
}

export default UsersPage;
