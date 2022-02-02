import { gql } from '@apollo/client';

import { UpdateUserLinkPositionsInput } from './update-user-link-positions.input';

export interface UpdateUserLinkPositionsVars {
  input: UpdateUserLinkPositionsInput[];
}

export const updateUserLinkPositionsMutationGql = gql`
  mutation updateUserLinkPositions($input: [UpdateUserLinkPositionInput!]!) {
    updateUserLinkPositions(input: $input) {
      success
    }
  }
`;
