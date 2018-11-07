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
import theme from 'styles/MyTheme';

// for datepicker import
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

// Authentications
import * as authenticate from 'utils/AuthService';
import * as themeService from 'utils/ThemeService';
import jwt from 'jsonwebtoken';
import {setCurrentUser, setColorTheme} from 'redux/actions/auth';
import {fetchCurrentOrganization} from 'redux/actions/organizations';

// Global Styles
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'styles/base.scss';

// import './styles/index.css';

function startApp() {

  const history = createHistory();
  const store = configureStore(undefined, history);

  const generateClassName = createGenerateClassName();
  const jss = create(jssPreset());
  jss.options.insertionPoint = document.getElementById('jss-insertion-point');


  if (authenticate.getToken()) {
    authenticate.authenticateToken(localStorage.token);
    store.dispatch(setCurrentUser(jwt.decode(authenticate.getToken())));
    store.dispatch(fetchCurrentOrganization());
  }

  if (themeService.getThemeColor()) {
    store.dispatch(setColorTheme(themeService.getThemeColor()));
  }

  if (themeService.noThemeColor()) {
    themeService.setThemeColor('#5C181D');
  }

  ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme(themeService.getThemeColor())}>
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
