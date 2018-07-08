import notificationReducer from 'redux/reducers/notification';
import * as notificationActions from 'redux/actions/notification';
import {expect} from 'chai';
import {fromJS} from 'immutable';

describe('(Reducer) Notification', () => {
  let initialState = {};

  beforeEach(() => {
    initialState = fromJS({
      message: null,
      type: null,
      source: null,
      alert: false
    });
  });

  it('returns initial state', () => {
    expect(notificationReducer(undefined, {})).to.eql(initialState);
  });

  it('handles setMessage() - set message', () => {
    const messageState = fromJS({message: 'test'});
    const expectedMessageState = initialState.merge(messageState);
    expect(notificationReducer(undefined, notificationActions.setMessage('test')))
      .to.eql(expectedMessageState);
  });

  it('handles setMessage() - info type message', () => {
    const infoMessageState = {message: 'info message'};
    const options = {type: 'info'};
    const expectedMessageState = initialState.merge({
      ...infoMessageState,
      ...options
    });
    expect(notificationReducer(undefined, notificationActions.setMessage('info message', options)))
      .to.eql(expectedMessageState);
  });

  it('handles setMessage() - success type message', () => {
    const successMessageState = {message: 'success message'};
    const options = {type: 'success'};
    const expectedMessageState = initialState.merge({
      ...successMessageState,
      ...options
    });
    expect(notificationReducer(undefined, notificationActions.setMessage('success message', options)))
      .to.eql(expectedMessageState);
  });

  it('handles setMessage() - error type message', () => {
    const errorMessageState = {message: 'error message'};
    const options = {type: 'error'};
    const expectedMessageState = initialState.merge({
      ...errorMessageState,
      ...options
    });
    expect(notificationReducer(undefined, notificationActions.setMessage('error message', options)))
      .to.eql(expectedMessageState);
  });

  it('handles setMessage() - warning type message', () => {
    const warningMessageState = {message: 'warning message'};
    const options = {type: 'warning'};
    const expectedMessageState = initialState.merge({
      ...warningMessageState,
      ...options
    });
    expect(notificationReducer(undefined, notificationActions.setMessage('warning message', options)))
      .to.eql(expectedMessageState);
  });

  it('handles setMessage() - loading type message', () => {
    const loadingMessageState = {message: 'loading message'};
    const options = {type: 'loading'};
    const expectedMessageState = initialState.merge({
      ...loadingMessageState,
      ...options
    });
    expect(notificationReducer(undefined, notificationActions.setMessage('loading message', options)))
      .to.eql(expectedMessageState);
  });

  it('handles setMessage() - clear message', () => {
    expect(notificationReducer(undefined, notificationActions.clearMessage()))
      .to.eql(initialState);
  });
});
