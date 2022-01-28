import { useMutation } from '@apollo/client';
import { Button, Card, CardBody, CardFooter, Form } from 'grommet';
import { Trash, View } from 'grommet-icons';
import React from 'react';

import {
  UpdateUserLinkInput,
  updateUserLinkMutationGql,
} from './gql/update-user-link.mutation';
import { UserLink, UserLinkKindEnum } from './gql/user-link.types';
import { LinkItemTextInput, LinkItemTitleInput } from './LinkItem.styles';
import {
  CreateUserLinkInput,
  createUserLinkMutationGql,
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
  const [updateUserLinkMutation] = useMutation<UserLink, UpdateUserLinkInput>(
    updateUserLinkMutationGql
  );
  const [createUserLinkMutation] = useMutation<UserLink, CreateUserLinkInput>(
    createUserLinkMutationGql
  );

  const buildOnChangeHandler =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [field]: event.target.value });
    };

  const onSave = () => {
    setEditing(false);
  };

  const onSaveBlur: React.FocusEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    onSave();
  };

  const onSaveKeyUp: React.KeyboardEventHandler<HTMLInputElement> = event => {
    event.preventDefault();

    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const onFocus = () => {
    setEditing(true);
  };

  const canCreate = () => !!values.title && !!values.url;

  const save = async () => {
    try {
      if (!created && canCreate()) {
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

        return;
      } else if (created) {
        await updateUserLinkMutation({
          variables: {
            input: { id: userLink.id, title: values.title, url: values.url },
          },
        });
        setPrevValues(values);
      }
    } catch (error) {
      setValues(userLink);
      setPrevValues(userLink);
    }
  };

  React.useLayoutEffect(() => {
    if (!created) {
      titleInputRef?.current?.focus();
    }
  }, []);

  React.useEffect(() => {
    if (editing || !hasChanges) return;

    save();
  }, [editing, hasChanges]);

  return (
    <Form onBlur={onSaveBlur} onFocus={onFocus}>
      <Card
        direction="row"
        round="small"
        gap="medium"
        border={{ color: 'light-1' }}
        animation="fadeIn"
      >
        <CardBody pad="small" width="medium" gap="small">
          <LinkItemTitleInput
            placeholder="Enter the link title"
            name="title"
            size="medium"
            value={values.title}
            onKeyUp={onSaveKeyUp}
            onChange={buildOnChangeHandler('title')}
            ref={titleInputRef}
          />

          <LinkItemTextInput
            placeholder="Enter the link URL"
            name="url"
            size="small"
            value={values.url}
            onChange={buildOnChangeHandler('url')}
            onKeyUp={onSaveKeyUp}
          />
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
    </Form>
  );
};

export default LinkItem;
