import {combineReducers} from 'redux';
import eventsReducer from 'redux/reducers/events';
import authReducer from 'redux/reducers/auth';
<<<<<<< HEAD
=======
import organizationsReducer from 'redux/reducers/organizations';
>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0
import notificationReducer from 'redux/reducers/notification';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducers} from 'redux-form';

const appReducer = combineReducers({
  routing: routerReducer,
  form: formReducers,
  events: eventsReducer,
  auth: authReducer,
<<<<<<< HEAD
=======
  organizations: organizationsReducer,
>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0
  notification: notificationReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
