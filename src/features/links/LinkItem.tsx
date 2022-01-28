import { Box, Card, CardBody } from 'grommet';
import React from 'react';

import { UserLink } from './gql/user-link.types';
import { LinkItemTextInput, LinkItemTitleInput } from './LinkItem.styles';

interface Props {
  userLink: UserLink;
}

const LinkItem: React.FC<Props> = ({ userLink }) => {
  const [prevValues, setPrevValues] = React.useState<UserLink>(userLink);
  const [values, setValues] = React.useState<UserLink>(userLink);
  const [editing, setEditing] = React.useState(false);
  const hasChanges = React.useMemo(() => {
    return JSON.stringify(prevValues) !== JSON.stringify(values);
  }, [prevValues, values]);

  React.useEffect(() => {
    if (editing || !hasChanges) return;

    console.log('saving to api...');
    setPrevValues(values);
  }, [editing, hasChanges]);

  const buildOnChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [field]: event.target.value });
    };

  const onSave = () => {
    setEditing(false);
  };

  const onSaveBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    event.preventDefault();
    onSave();
  };

  const onSaveKeyUp: React.KeyboardEventHandler<HTMLInputElement> = event => {
    event.preventDefault();

    if (event.key === 'Enter') {
      onSave();
      event.currentTarget.blur();
    }
  };

  const onFocus = () => {
    setEditing(true);
  };

  return (
    <Card round="small" pad="medium" gap="medium" border={{ color: 'light-1' }}>
      <CardBody gap="small" width="medium">
        <Box direction="row">
          <LinkItemTitleInput
            placeholder="Enter the link title"
            name="title"
            size="medium"
            value={values.title}
            onFocus={onFocus}
            onChange={buildOnChange('title')}
            onBlur={onSaveBlur}
            onKeyUp={onSaveKeyUp}
          />
        </Box>

        <LinkItemTextInput
          placeholder="Enter the link URL"
          name="url"
          size="small"
          value={values.url}
          onFocus={onFocus}
          onChange={buildOnChange('url')}
          onBlur={onSaveBlur}
          onKeyUp={onSaveKeyUp}
        />
      </CardBody>
    </Card>
  );
};

export default LinkItem;
