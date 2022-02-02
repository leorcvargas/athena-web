import React from 'react';
import { Box, Main } from 'grommet';
import { useQuery } from '@apollo/client';

import { userLinksQuery, UserLinksQueryResponse } from './gql/user-links.query';
import FetchLinksError from './FetchLinksError';
import LinkList from './LinkList';
import AppSpinner from '../../components/Spinner';
import { UserLink } from './gql/user-link.types';

const Links: React.FC = () => {
  const [links, setLinks] = React.useState<UserLink[]>([]);
  const { data, loading, error, refetch } =
    useQuery<UserLinksQueryResponse>(userLinksQuery);

  const onCreate = () => {
    const newLinkBoilerplate: any = {
      title: '',
      url: '',
      display: true,
      position: links.length,
    };
    setLinks([...links, newLinkBoilerplate]);
  };

  const refetchLinks = async () => {
    refetch();
  };

  React.useEffect(() => {
    setLinks(data?.userLinks as UserLink[]);
  }, [data?.userLinks?.length]);

  return (
    <Main fill>
      <FetchLinksError display={!!error && !loading} />
      {loading && <AppSpinner />}
      {data && (
        <Box pad="medium" direction="column" align="center" gap="medium" fill>
          <LinkList
            data={links}
            onCreate={onCreate}
            refetchLinks={refetchLinks}
          />
        </Box>
      )}
    </Main>
  );
};

export default Links;
