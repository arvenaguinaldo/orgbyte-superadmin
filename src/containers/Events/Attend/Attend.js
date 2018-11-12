import React, {Component} from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import AttendTheme from 'styles/AttendTheme';
import Typography from '@material-ui/core/Typography';


class Attend extends Component {
  render() {
    return (
      <MuiThemeProvider theme={AttendTheme('#4caf50')}>
        <Typography variant="h4" color="primary" >HELLO</Typography>
      </MuiThemeProvider>
    );
  }
}

export default Attend;
