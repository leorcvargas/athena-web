import React from 'react';
import { Box, Button } from 'grommet';

import { UserLink } from './gql/user-link.types';
import LinkItem from './LinkItem';

interface Props {
  data: UserLink[];
}

const LinkList: React.FC<Props> = ({ data = [] }) => {
  return (
    <Box direction="column" gap="medium" width="medium">
      <Button primary label="Create Link" />

      {data.map(item => (
        <LinkItem key={item.id} userLink={item} />
      ))}
    </Box>
  );
};

export default LinkList;
