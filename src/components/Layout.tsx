import { useQuery } from '@apollo/client';
import { Box } from 'grommet';
import { useRouter } from 'next/router';
import React from 'react';

import {
  profileQueryGql,
  ProfileQueryPayload,
} from '../features/user/gql/profile.query';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const { data, loading, error } =
    useQuery<ProfileQueryPayload>(profileQueryGql);

  React.useEffect(() => {
    if (error) {
      router.push('/login');
    }
  }, [error]);

  if (!data?.profile || loading) {
    return null;
  }

  return (
    <Box direction="row" height={{ min: '100%' }}>
      <AppSidebar />
      <Box fill>
        <AppHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
