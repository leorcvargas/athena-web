import React from 'react';
import { Avatar, Box, Button, DropButton, Nav, Sidebar } from 'grommet';
import * as Icons from 'grommet-icons';
import { useRouter } from 'next/router';

import { destroyAccessToken } from '../services/auth';
import { useAppDispatch } from '../app/hooks';
import { resetUser } from '../features/user/userSlicer';

const AppSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    destroyAccessToken();
    dispatch(resetUser());
    router.push('/login');
  };

  return (
    <Sidebar
      background="brand"
      footer={
        <DropButton
          alignSelf="center"
          margin={{ vertical: 'small' }}
          dropContent={
            <Box width="small" pad="small" background="light-1">
              <Button
                label="Logout"
                icon={<Icons.Logout />}
                onClick={logout}
                plain
                hoverIndicator
              />
            </Box>
          }
          dropProps={{
            align: { top: 'top', left: 'right' },
            background: 'light-1',
            round: 'small',
            margin: '8px',
          }}
        >
          <Box height="36px" width="36px" align="center">
            <Avatar src="/no-profile-picture.png" />
          </Box>
        </DropButton>
      }
    >
      <Nav gap="small" align="center">
        <Button icon={<Icons.Projects />} hoverIndicator />
        <Button icon={<Icons.Clock />} hoverIndicator />
      </Nav>
    </Sidebar>
  );
};

export default AppSidebar;
