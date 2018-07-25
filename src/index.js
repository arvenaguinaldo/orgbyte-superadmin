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

// Global Styles
import 'styles/base.scss';

function startApp() {

  const history = createHistory();
  const store = configureStore(undefined, history);

  const generateClassName = createGenerateClassName();
  const jss = create(jssPreset());
  jss.options.insertionPoint = document.getElementById('jss-insertion-point');

  ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={myTheme}>
            <CssBaseline />
            <App />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    </JssProvider>,
    document.getElementById('root'),
  );

}

startApp();
