import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

/**
 * * A theme for defining high and trickling down
 */

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#1f64cd',
      main: '#1f64cd',
      dark: '#1f64cd'
    },
    secondary: {
      light: green[300],
      main: '#ffffff',
      dark: green[700],
    },
    background: {
      default: '#eaeaea'
      // background-image: -webkit-linear-gradient(90deg, #EAEAE9 67%, #1f64cd 50%);
    },
    blue: '#1f64cd',
    white: '#ffffff',
    accent: '#cd1f4c',
    green: {
      light: '#45a621',
      dark: '#317917'
    },
    red: {
      light: '#cd1f1f',
      dark: '#971515'
    }
  },
  typography: {
    useNextVariants: true,
  },
  link: {
    primary: '#1f64cd',
    hover: '#002b6c'
  },
  requiresAction: '#834de2',
  table: {
    hover: '#dddddd'
  },
})

export default theme
