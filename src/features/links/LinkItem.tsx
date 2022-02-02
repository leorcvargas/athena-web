import { useMutation } from '@apollo/client';
import { Box, Card, CardBody, CardHeader } from 'grommet';
import { Drag } from 'grommet-icons';
import React from 'react';

import { UserLink, UserLinkKindEnum } from './gql/user-link.types';
import {
  DragBox,
  LinkItemTextInput,
  LinkItemTitleInput,
} from './LinkItem.styles';
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
import { ResponsePayload } from '../shared/gql/types/response.payload';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import LinkItemFooter from './LinkItemFooter';

interface Props {
  id: number;
  index: number;
  userLink: UserLink;
  refetchLinks(): Promise<void>;
  updatePositions(): Promise<void>;
  moveItem(dragIndex: number, hoverIndex: number): void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const LinkItem: React.FC<Props> = ({
  id,
  index,
  userLink,
  moveItem,
  refetchLinks,
  updatePositions,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
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
  const [deleteUserLinkMutation] = useMutation<
    ResponsePayload,
    DeleteUserLinkVars
  >(deleteUserLinkMutationGql);

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!cardRef.current) {
        return;
      }

      if (!created) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = cardRef.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop: async () => {
      await updatePositions();
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
      if (!created) {
        return false;
      }
      return true;
    },
  });

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
          position: index,
          display: true,
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

  const onToggleDisplay = () =>
    setValues({ ...values, display: !values.display });

  React.useEffect(() => {
    if (!created) {
      titleInputRef?.current?.focus();
    }
  }, []);

  React.useEffect(() => {
    if (editing || !hasChanges) return;

    save();
  }, [editing, hasChanges]);

  drag(drop(cardRef));

  return (
    <Card
      ref={cardRef}
      direction="row"
      round="small"
      gap="medium"
      border={{ color: 'light-3' }}
      style={{ opacity: isDragging ? 0 : 1 }}
      elevation={undefined}
      data-handler-id={handlerId}
    >
      <CardHeader
        border={{ color: 'light-3', side: 'right' }}
        pad={{ horizontal: 'xxsmall' }}
      >
        <DragBox align="center" justify="center" fill>
          <Drag />
        </DragBox>
      </CardHeader>
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

      <LinkItemFooter
        linkDisplay={values.display}
        onDelete={onDelete}
        onToggleDisplay={onToggleDisplay}
        disabled={!created}
      />
    </Card>
  );
};

export default LinkItem;
