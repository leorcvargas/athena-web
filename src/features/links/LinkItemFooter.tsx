import { Button, CardFooter, Tip } from 'grommet';
import { Trash, View, Hide } from 'grommet-icons';
import React from 'react';

interface Props {
  linkDisplay: boolean;
  disabled: boolean;
  onDelete(): Promise<void>;
  onToggleDisplay(): void;
}

const LinkItemFooter: React.FC<Props> = ({
  linkDisplay,
  disabled,
  onDelete,
  onToggleDisplay,
}) => {
  const displayIcon = React.useMemo(
    () => (linkDisplay ? <View color="accent-1" /> : <Hide color="accent-2" />),
    [linkDisplay]
  );
  const displayTip = React.useMemo(
    () => (linkDisplay ? 'Hide' : 'Show'),
    [linkDisplay]
  );

  return (
    <CardFooter
      pad={{ horizontal: 'small' }}
      background="light-0"
      border={{ color: 'light-3', side: 'left' }}
      direction="column"
      justify="evenly"
      gap={undefined}
    >
      <Tip content={displayTip} dropProps={{ align: { left: 'right' } }}>
        <Button
          icon={displayIcon}
          onClick={onToggleDisplay}
          disabled={disabled}
          hoverIndicator
        />
      </Tip>
      <Tip content="Delete link" dropProps={{ align: { left: 'right' } }}>
        <Button
          onClick={onDelete}
          icon={<Trash color="" />}
          disabled={disabled}
          hoverIndicator
        />
      </Tip>
    </CardFooter>
  );
};

export default LinkItemFooter;
