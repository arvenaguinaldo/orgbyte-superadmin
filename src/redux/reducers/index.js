import {combineReducers} from 'redux';
import eventsReducer from 'redux/reducers/events';
import authReducer from 'redux/reducers/auth';
import organizationsReducer from 'redux/reducers/organizations';
import notificationReducer from 'redux/reducers/notification';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducers} from 'redux-form';

const appReducer = combineReducers({
  routing: routerReducer,
  form: formReducers,
  events: eventsReducer,
  auth: authReducer,
  organizations: organizationsReducer,
  notification: notificationReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
