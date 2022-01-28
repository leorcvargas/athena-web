import { Box, Notification } from 'grommet';
import React from 'react';

interface Props {
  display: boolean;
}

const FetchLinksError: React.FC<Props> = ({ display }) => {
  if (!display) {
    return null;
  }

  return (
    <Box
      pad="large"
      direction="column"
      align="center"
      justify="center"
      gap="medium"
      fill
    >
      <Notification
        title="Error"
        message="We were not able to fetch your links"
        status="critical"
      />
    </Box>
  );
};

export default FetchLinksError;
