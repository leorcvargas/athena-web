import React from 'react';
import { Box, Button } from 'grommet';

import { UserLink } from './gql/user-link.types';
import LinkItem from './LinkItem';

interface Props {
  data: UserLink[];
  onCreate(): void;
  refetchLinks(): Promise<void>;
}

const LinkList: React.FC<Props> = ({ onCreate, refetchLinks, data = [] }) => {
  return (
    <Box direction="column" gap="medium" width="medium">
      <Box animation="fadeIn">
        <Button primary label="Create Link" onClick={onCreate} />
      </Box>

      {data.map((item, i) => (
        <LinkItem refetchLinks={refetchLinks} key={i} userLink={item} />
      ))}
    </Box>
  );
};

export default LinkList;
