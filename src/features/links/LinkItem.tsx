import { useMutation } from '@apollo/client';
import { Box, Card, CardBody } from 'grommet';
import React from 'react';

import {
  UpdateUserLinkInput,
  updateUserLinkMutationGql,
} from './gql/update-user-link.mutation';
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
  const [updateUserLinkMutation] = useMutation<UserLink, UpdateUserLinkInput>(
    updateUserLinkMutationGql
  );

  const buildOnChangeHandler =
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

  const save = async () => {
    try {
      await updateUserLinkMutation({
        variables: {
          input: { id: userLink.id, title: values.title, url: values.url },
        },
      });
      setPrevValues(values);
    } catch (error) {
      setValues(userLink);
      setPrevValues(userLink);
    }
  };

  React.useEffect(() => {
    if (editing || !hasChanges) return;

    save();
  }, [editing, hasChanges]);

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
            onChange={buildOnChangeHandler('title')}
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
          onChange={buildOnChangeHandler('url')}
          onBlur={onSaveBlur}
          onKeyUp={onSaveKeyUp}
        />
      </CardBody>
    </Card>
  );
};

export default LinkItem;
