import { TextInput } from 'grommet';
import styled, { css } from 'styled-components';

const linkItemTextInputStyle = css`
  border: none;
  background: #f8f8f8;
  &:focus {
    box-shadow: none;
  }
`;

export const LinkItemTextInput = styled(TextInput)`
  ${linkItemTextInputStyle}
  font-weight: normal;
`;

export const LinkItemTitleInput = styled(TextInput)`
  ${linkItemTextInputStyle}
`;
