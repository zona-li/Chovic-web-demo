import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, teal } from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: cyan,
  },
  typography: {
    fontFamily: [
      'Dosis',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
});

export default theme;