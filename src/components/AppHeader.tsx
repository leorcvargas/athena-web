import { Anchor, Header, Nav } from 'grommet';
import Link from 'next/link';
import React from 'react';

const items = [
  { label: 'Links', href: '/app' },
  { label: 'Settings', href: '/app/settings' },
];

const AppHeader: React.FC = () => {
  return (
    <Header background="light-2" pad="medium">
      <Nav direction="row">
        {items.map((item, i) => (
          <Link href={item.href} key={i}>
            <Anchor label={item.label} />
          </Link>
        ))}
      </Nav>
    </Header>
  );
};

export default AppHeader;
