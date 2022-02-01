import { useMutation } from '@apollo/client';
import { Box, Button, Card, CardBody, CardFooter } from 'grommet';
import { Trash, View } from 'grommet-icons';
import React from 'react';

import { UserLink, UserLinkKindEnum } from './gql/user-link.types';
import { LinkItemTextInput, LinkItemTitleInput } from './LinkItem.styles';
import {
  updateUserLinkMutationGql,
  UpdateUserLinkVars,
} from './gql/update-user-link.mutation';
import {
  createUserLinkMutationGql,
  CreateUserLinkVars,
} from './gql/create-user-link.mutation';

interface Props {
  userLink: UserLink;
  refetchLinks(): Promise<void>;
}

const LinkItem: React.FC<Props> = ({ userLink, refetchLinks }) => {
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const [prevValues, setPrevValues] = React.useState<UserLink>(userLink);
  const [values, setValues] = React.useState<UserLink>(userLink);
  const [editing, setEditing] = React.useState(false);
  const [created, setCreated] = React.useState(!!userLink.id);
  const hasChanges = React.useMemo(() => {
    return JSON.stringify(prevValues) !== JSON.stringify(values);
  }, [prevValues, values]);

  const [updateUserLinkMutation] = useMutation<UserLink, UpdateUserLinkVars>(
    updateUserLinkMutationGql
  );

  const [createUserLinkMutation] = useMutation<UserLink, CreateUserLinkVars>(
    createUserLinkMutationGql
  );

  const onBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    event.preventDefault();

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setEditing(false);
  };

  const onFocus = () => setEditing(true);

  const onSaveKeyUp: React.KeyboardEventHandler<HTMLInputElement> = event => {
    event.preventDefault();

    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const canCreate = () => !!values.title && !!values.url;

  const update = async () => {
    await updateUserLinkMutation({
      variables: {
        id: userLink.id,
        input: { title: values.title, url: values.url },
      },
    });
    setPrevValues(values);
  };

  const create = async () => {
    await createUserLinkMutation({
      variables: {
        input: {
          title: values.title,
          url: values.url,
          kind: UserLinkKindEnum.BASIC,
        },
      },
    });
    setCreated(true);
    setPrevValues(values);
    await refetchLinks();
  };

  const onSaveError = () => {
    setValues(userLink);
    setPrevValues(userLink);
  };

  const save = async () => {
    try {
      if (!created && canCreate()) {
        await create();
      } else if (created) {
        await update();
      }
    } catch (error) {
      onSaveError();
    }
  };

  React.useEffect(() => {
    if (!created) {
      titleInputRef?.current?.focus();
    }
  }, []);

  React.useEffect(() => {
    if (editing || !hasChanges) return;

    save();
  }, [editing, hasChanges]);

  return (
    <Card
      direction="row"
      round="small"
      gap="medium"
      border={{ color: 'light-1' }}
      animation="fadeIn"
    >
      <CardBody>
        <Box pad="small" width="medium" gap="small">
          <LinkItemTitleInput
            ref={titleInputRef}
            defaultValue={values.title}
            placeholder="Enter the link title"
            name="title"
            size="medium"
            onKeyUp={onSaveKeyUp}
            onBlur={onBlur}
            onFocus={onFocus}
          />

          <LinkItemTextInput
            placeholder="Enter the link URL"
            defaultValue={values.url}
            name="url"
            size="small"
            onKeyUp={onSaveKeyUp}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </Box>
      </CardBody>

      <CardFooter
        pad={{ horizontal: 'small' }}
        background="light-0"
        border={{ color: 'light-3', side: 'left' }}
        direction="column"
        justify="evenly"
        gap={undefined}
      >
        <Button icon={<View color="accent-1" />} hoverIndicator />
        <Button icon={<Trash color="accent-2" />} hoverIndicator />
      </CardFooter>
    </Card>
  );
};

export default LinkItem;
