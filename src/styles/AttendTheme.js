import {createMuiTheme} from '@material-ui/core/styles';

const attendTheme = colorTheme => createMuiTheme({
  shadows: Array(25).fill('none'),
  palette: {
    background: {
      paper: colorTheme,
      default: colorTheme
    },
    primary: {
      main: colorTheme
    },
    secondary: {
      main: '#363736'
    },
    error: {
      main: '#CB3C32'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      divider: 'rgba(0, 0, 0, 0.12)'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
  // overrides: {
  //   MuiDrawer: { // Name of the component ⚛️ / style sheet
  //     paper: { // Name of the rule
  //       background: colorTheme, // Some CSS
  //       width: drawerWidth
  //     }
  //   },
  //   MuiTypography: { // Name of the component ⚛️ / style sheet
  //     h4: { // Name of the rule
  //       fontWeight: 'bold'
  //     }
  //   },
  //   MUIDataTableHeadCell: {
  //     root: {
  //       backgroundColor: '#eee',
  //       padding: '0px 10px 0px 10px'
  //     }
  //   },
  //   MUIDataTableBodyRow: {
  //     root: {
  //       backgroundColor: '#fff',
  //       padding: '0px 10px 0px 10px',
  //       '&:hover': {
  //         backgroundColor: '#eee',
  //         color: '#fff',
  //         cursor: 'pointer'
  //       }
  //     }
  //   },
  //   MUIDataTableBodyCell: {
  //     root: {
  //       padding: '0px 10px 0px 10px'
  //     }
  //   }
  // }
});

export default attendTheme;
