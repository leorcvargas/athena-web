import { Box } from 'grommet';
import { useRouter } from 'next/router';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserProfile, selectUser } from '../features/user/userSlicer';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(selectUser);

  React.useEffect(() => {
    if (!profile.data.id) {
      dispatch(getUserProfile());
    }
  }, []);

  React.useEffect(() => {
    if (profile.error) {
      router.push('/login');
    }
  }, [profile.error]);

  if (!profile.data.id || profile.pending) {
    return null;
  }

  return (
    <Box direction="row" height={{ min: '100%' }} animation="fadeIn">
      <AppSidebar />
      <Box fill>
        <AppHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
