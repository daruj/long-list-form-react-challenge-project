import { useQuery } from 'react-query';
import { fetchUsers } from '@src/api/users.api';
import CircularProgress from '@mui/material/CircularProgress';

import ContentContainer from '@src/components/ContentContainer';
import { StatisticPieChart } from '@src/components/StatisticPieChart';
import React from 'react';
import { countUsersByCountry } from '@src/utils/countries.utils';

function UsersPage() {
  const { data, isSuccess, isError, isLoading, refetch } = useQuery('users', fetchUsers, {
    refetchOnWindowFocus: false,
    select: React.useCallback(countUsersByCountry, []),
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
        <StatisticPieChart data={data} />
      </ContentContainer>
    );
  }
}

export default UsersPage;
