import { Box } from 'grommet';
import styled, { createGlobalStyle } from 'styled-components';

export const SignUpBodyStyle = createGlobalStyle`
  body {
    min-height: 100vh;
  }
`;

export const ImageBox = styled(Box)`
  @media (max-width: 425px) {
    display: none;
  }
`;
