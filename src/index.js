import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from 'redux/configureStore';
import App from 'containers/App/App';

// Authentications
import * as authenticate from 'utils/AuthService';
import jwt from 'jsonwebtoken';
import {setCurrentUser} from 'redux/actions/auth';

// Global Styles
import 'styles/base.scss';


function startApp() {

  const history = createHistory();
  const store = configureStore(undefined, history);

  if (authenticate.getToken()) {
    authenticate.authenticateToken(localStorage.token);
    store.dispatch(setCurrentUser(jwt.decode(authenticate.getToken())));
  }

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );

}

startApp();
