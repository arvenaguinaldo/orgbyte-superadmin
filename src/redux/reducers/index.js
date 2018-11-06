import {combineReducers} from 'redux';
import eventsReducer from 'redux/reducers/events';
import authReducer from 'redux/reducers/auth';
import organizationsReducer from 'redux/reducers/organizations';
import usersReducer from 'redux/reducers/users';
import shirtsReducer from 'redux/reducers/shirts';
import editReducer from 'redux/reducers/edit';
import coursesReducer from 'redux/reducers/courses';
import collegesReducer from 'redux/reducers/colleges';
import organizationNaturesReducer from 'redux/reducers/organization_natures';
import announcementsReducer from 'redux/reducers/announcements';
import notificationReducer from 'redux/reducers/notification';
import {AUTH} from 'constants/actions/auth';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducers} from 'redux-form';

const appReducer = combineReducers({
  routing: routerReducer,
  form: formReducers,
  events: eventsReducer,
  auth: authReducer,
  organizations: organizationsReducer,
  users: usersReducer,
  shirts: shirtsReducer,
  edit: editReducer,
  courses: coursesReducer,
  colleges: collegesReducer,
  organizationNatures: organizationNaturesReducer,
  announcements: announcementsReducer,
  notification: notificationReducer
});

const rootReducer = (state, action) => {
  if (action.type === AUTH.LOGOUT) {
    state = undefined; // eslint-disable-line
  }
  return appReducer(state, action);
};

export default rootReducer;
