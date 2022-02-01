import { useMutation } from '@apollo/client';
import { Box, Button, Card, CardBody, CardFooter, Tip } from 'grommet';
import { Trash, View, Hide } from 'grommet-icons';
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
import {
  deleteUserLinkMutationGql,
  DeleteUserLinkVars,
} from './gql/delete-user-link.mutation';
import { ResponsePayload } from '../shared/gql/response.payload';

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
  const displayIcon = React.useMemo(
    () =>
      values.display ? <View color="accent-1" /> : <Hide color="accent-2" />,
    [values.display]
  );
  const displayTip = React.useMemo(
    () => (values.display ? 'Hide' : 'Show'),
    [values.display]
  );

  const [updateUserLinkMutation] = useMutation<UserLink, UpdateUserLinkVars>(
    updateUserLinkMutationGql
  );

  const [createUserLinkMutation] = useMutation<UserLink, CreateUserLinkVars>(
    createUserLinkMutationGql
  );

  const [deleteUserLinkMutation] = useMutation<
    ResponsePayload,
    DeleteUserLinkVars
  >(deleteUserLinkMutationGql);

  const onBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    event.preventDefault();

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setEditing(false);
  };

  const onFocus = () => setEditing(true);

  const onKeyUp: React.KeyboardEventHandler<HTMLInputElement> = event => {
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
        input: {
          title: values.title,
          url: values.url,
          display: values.display,
        },
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

  const onDelete = async () => {
    try {
      const confirmation = confirm(`Do you want to delete ${userLink.title}?`);

      if (!confirmation) return;

      await deleteUserLinkMutation({ variables: { id: userLink.id } });
      await refetchLinks();
    } catch (error) {
      alert(`Error deleting ${userLink.title} link`);
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
      animation="slideUp"
    >
      <CardBody>
        <Box pad="small" width="medium" gap="small">
          <LinkItemTitleInput
            ref={titleInputRef}
            defaultValue={values.title}
            placeholder="Enter the link title"
            name="title"
            size="medium"
            onKeyUp={onKeyUp}
            onBlur={onBlur}
            onFocus={onFocus}
          />

          <LinkItemTextInput
            placeholder="Enter the link URL"
            defaultValue={values.url}
            name="url"
            size="small"
            onKeyUp={onKeyUp}
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
        <Tip content={displayTip} dropProps={{ align: { left: 'right' } }}>
          <Button
            icon={displayIcon}
            onClick={() => setValues({ ...values, display: !values.display })}
            disabled={!created}
            hoverIndicator
          />
        </Tip>
        <Tip content="Delete link" dropProps={{ align: { left: 'right' } }}>
          <Button
            onClick={onDelete}
            icon={<Trash color="" />}
            disabled={!created}
            hoverIndicator
          />
        </Tip>
      </CardFooter>
    </Card>
  );
};

export default LinkItem;
