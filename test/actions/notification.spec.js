import * as notificationActions from 'redux/actions/notification';
import {NOTIFICATION} from 'constants/actions/notification';
import {expect} from 'chai';

describe('(Action) Notification', () => {
  it('creates an action to set notification message', () => {
    const message = 'test';
    const options = undefined;
    const action = {
      type: NOTIFICATION.SET_MESSAGE,
      message,
      options
    };
    expect(action.type).to.not.be.undefined;
    expect(notificationActions.setMessage(message)).to.eql(action);
  });

  it('creates an action to clear notification message', () => {
    const action = {
      type: NOTIFICATION.CLEAR_MESSAGE
    };
    expect(notificationActions.clearMessage()).to.eql(action);
  });
});
