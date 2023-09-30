import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { useQuery } from 'react-query';
import { fetchUsers } from '@src/api/users.api';

import InputField from '@src/components/InputField';
import ContentContainer from '@src/components/ContentContainer';
import React, { useState } from 'react';
import { User } from '@src/entities/user';
import { Box } from '@mui/system';

function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isSuccess, isError, isLoading, refetch } = useQuery('users', fetchUsers, {
    refetchOnWindowFocus: false,
    select: React.useCallback(
      (users: User[]) => {
        if (!searchQuery.length) return users;

        const matchingObjects = [];
        const searchLower = searchQuery.toLowerCase();
        for (const user of users) {
          if (user.name && user.name.toLowerCase().includes(searchLower)) {
            matchingObjects.push(user);
          } else if (user.email && user.email.toLowerCase().includes(searchLower)) {
            matchingObjects.push(user);
          } else if (user.country && user.country.toLowerCase().includes(searchLower)) {
            matchingObjects.push(user);
          } else if (user.phone && user.phone.includes(searchQuery)) {
            matchingObjects.push(user);
          }
        }

        return matchingObjects;
      },
      [searchQuery]
    ),
  });

  const handleRefetch = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    refetch();
  };

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

  return (
    <ContentContainer>
      <>
        <Box width="100%" marginBottom={1}>
          <InputField
            value={searchQuery}
            onChangeHandler={(name, value) => {
              setSearchQuery(value);
            }}
            name="search"
            placeholder="Search User..."
          />
        </Box>
        <UsersList list={isSuccess && data ? data : []} isLoading={isLoading} />

        <div className={styles.rightButtonContainer}>
          <PrimaryButton disabled={false} handleClick={() => null}>
            <span>Save</span>
          </PrimaryButton>
        </div>
      </>
    </ContentContainer>
  );
}

export default UsersPage;
