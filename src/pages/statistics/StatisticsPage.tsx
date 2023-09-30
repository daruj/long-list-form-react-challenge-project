import { useQuery } from 'react-query';
import { fetchUsers } from '@src/api/users.api';
import CircularProgress from '@mui/material/CircularProgress';

import ContentContainer from '@src/components/ContentContainer';
import { StatisticPieChart } from '@src/components/StatisticPieChart';
import React from 'react';
import { countUsersByCountry } from '@src/utils/countries.utils';
import { User } from '../../entities/user';

function UsersPage() {
  const { data, isSuccess, isError, isLoading, refetch } = useQuery('users', fetchUsers, {
    refetchOnWindowFocus: false,
    select: React.useCallback(
      (users: User[]) => ({
        users,
        amountOfUsers: users.length,
        statistics: countUsersByCountry(users),
      }),
      []
    ),
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
          We were not able to retrieve the statistics, please{' '}
          <a href="/#" onClick={handleRefetch}>
            try refetching
          </a>
        </span>
      </ContentContainer>
    );

  if (isSuccess && data) {
    return (
      <ContentContainer>
        {data.amountOfUsers ? (
          <StatisticPieChart data={data.statistics} />
        ) : (
          <div>We did not find any data to display in the chart</div>
        )}
      </ContentContainer>
    );
  }
}

export default UsersPage;
