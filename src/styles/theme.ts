import { ThemeType } from 'grommet';
import { grommet } from 'grommet/themes/grommet';

const theme: ThemeType = {
  ...grommet,
  global: {
    ...grommet.global,
    font: {
      ...grommet.global?.font,
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

export default theme;
