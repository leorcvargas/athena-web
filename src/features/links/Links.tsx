import React from 'react';
import { Box, Main } from 'grommet';
import { useQuery } from '@apollo/client';

import { userLinksQuery, UserLinksQueryResponse } from './gql/user-links.query';
import FetchLinksError from './FetchLinksError';
import LinkList from './LinkList';
import AppSpinner from '../../components/Spinner';

const Links: React.FC = () => {
  const { data, loading, error } =
    useQuery<UserLinksQueryResponse>(userLinksQuery);

  React.useEffect(() => {
    console.log({ data, loading });
  }, [data, loading]);

  return (
    <Main fill>
      <FetchLinksError display={!!error && !loading} />
      {loading && <AppSpinner />}
      {data && (
        <Box pad="medium" direction="column" align="center" gap="medium" fill>
          <LinkList data={data?.userLinks ?? []} />
        </Box>
      )}
    </Main>
  );
};

export default Links;
