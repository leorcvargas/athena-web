import React from 'react';
import { Box, Button } from 'grommet';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import { UserLink } from './gql/user-link.types';
import LinkItem from './LinkItem';
import {
  UpdateUserLinkPositionsVars,
  updateUserLinkPositionsMutationGql,
} from './gql/update-user-link-positions.mutation';
import { useMutation } from '@apollo/client';

interface Props {
  data: UserLink[];
  onCreate(): void;
  refetchLinks(): Promise<void>;
}

const LinkList: React.FC<Props> = ({ onCreate, refetchLinks, data = [] }) => {
  const [links, setLinks] = React.useState<UserLink[]>([]);

  const [updateUserLinkPositions] = useMutation<
    UserLink,
    UpdateUserLinkPositionsVars
  >(updateUserLinkPositionsMutationGql);

  React.useEffect(() => {
    setLinks(data);
  }, [data]);

  const moveItem = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = links[dragIndex];
      setLinks(
        update(links, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [links]
  );

  const updatePositions = async () => {
    const input = links.map((link, i) => ({
      id: link.id,
      position: i,
    }));
    await updateUserLinkPositions({ variables: { input } });
  };

  return (
    <Box direction="column" gap="medium" align="center" fill>
      <Box width="medium">
        <Button label="Create Link" onClick={onCreate} />
      </Box>

      <DndProvider backend={HTML5Backend}>
        <Box gap="medium" width="medium">
          {links.map((item, i) => {
            const id = item.id ?? `placeholder-${item.position}`;

            return (
              <LinkItem
                id={id}
                key={id}
                index={i}
                userLink={item}
                refetchLinks={refetchLinks}
                moveItem={moveItem}
                updatePositions={updatePositions}
              />
            );
          })}
        </Box>
      </DndProvider>
    </Box>
  );
};

export default LinkList;
