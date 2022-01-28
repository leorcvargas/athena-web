import { Box, Spinner } from 'grommet';
import React from 'react';

const AppSpinner: React.FC = () => (
  <Box fill pad="large" align="center" justify="center">
    <Spinner size="medium" />
  </Box>
);

export default AppSpinner;
