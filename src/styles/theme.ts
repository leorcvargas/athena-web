import { ThemeType } from 'grommet';
import { grommet } from 'grommet/themes/grommet';

const theme: ThemeType = {
  ...grommet,
  global: {
    ...grommet.global,
    font: {
      ...grommet.global?.font,
      family: 'Roboto',
    },
  },
};

export default theme;
