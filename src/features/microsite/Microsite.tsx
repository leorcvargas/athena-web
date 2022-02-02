import { Main, Avatar, Box, Heading, Button, Text } from 'grommet';
import React from 'react';

import { UserLink } from '../links/gql/user-link.types';
import { PublicProfilePayload } from '../user/gql/public-profile.payload';

interface Props {
  data: PublicProfilePayload;
}

const renderButton = (link: UserLink) => {
  const url = React.useMemo(
    () =>
      link.url.includes('https://') || link.url.includes('http://')
        ? link.url
        : `//${link.url}`,
    [link.url]
  );

  return (
    <Button
      primary
      key={link.id}
      href={url}
      label={link.title}
      target="_blank"
      fill="horizontal"
      justify="center"
      style={{ textAlign: 'center' }}
    />
  );
};

const Microsite: React.FC<Props> = ({ data }) => {
  const name = data.displayName ?? `${data.username}`;

  return (
    <Main background="brand" fill>
      <Box
        direction="column"
        align="center"
        justify="center"
        pad="large"
        gap="medium"
      >
        <Avatar src="/no-profile-picture.png" size="xlarge" />

        <Box direction="column" align="center" gap="xxsmall">
          <Heading level="3" size="small">
            {name}
          </Heading>
          <Text size="small">{data.bio}</Text>
        </Box>

        <Box gap="medium" width="medium">
          {data.links.map(renderButton)}
        </Box>
      </Box>
    </Main>
  );
};

export default Microsite;
