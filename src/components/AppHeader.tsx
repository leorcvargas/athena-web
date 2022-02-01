import { Anchor, Box, Header, Nav } from 'grommet';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const items = [
  { label: 'Links', href: '/app' },
  { label: 'Settings', href: '/app/settings' },
];

const AppHeader: React.FC = () => {
  const router = useRouter();

  return (
    <Header background="brand">
      <Nav direction="row">
        {items.map((item, i) => (
          <Box
            key={i}
            align="center"
            border={
              router.pathname === item.href
                ? { color: 'accent-1', side: 'bottom', size: '2px' }
                : undefined
            }
            pad="medium"
          >
            <Link href={item.href}>
              <Anchor label={item.label} />
            </Link>
          </Box>
        ))}
      </Nav>
    </Header>
  );
};

export default AppHeader;
