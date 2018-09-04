import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from 'redux/configureStore';
import App from 'containers/App/App';
import {create} from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import myTheme from 'styles/MyTheme';

<<<<<<< HEAD
=======
// for datepicker import
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0
// Authentications
import * as authenticate from 'utils/AuthService';
import jwt from 'jsonwebtoken';
import {setCurrentUser} from 'redux/actions/auth';

// Global Styles
import 'styles/base.scss';


function startApp() {

  const history = createHistory();
  const store = configureStore(undefined, history);

  const generateClassName = createGenerateClassName();
  const jss = create(jssPreset());
  jss.options.insertionPoint = document.getElementById('jss-insertion-point');


  if (authenticate.getToken()) {
    authenticate.authenticateToken(localStorage.token);
    store.dispatch(setCurrentUser(jwt.decode(authenticate.getToken())));
  }


  ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={myTheme}>
              <CssBaseline />
              <App />
            </MuiThemeProvider>
          </ConnectedRouter>
        </MuiPickersUtilsProvider>
      </Provider>
    </JssProvider>,
    document.getElementById('root'),
  );

}

startApp();
