import {combineReducers} from 'redux';
import eventsReducer from 'redux/reducers/events';
import authReducer from 'redux/reducers/auth';
import notificationReducer from 'redux/reducers/notification';
import {routerReducer} from 'react-router-redux';

const appReducer = combineReducers({
  routing: routerReducer,
  events: eventsReducer,
  auth: authReducer,
  notification: notificationReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
