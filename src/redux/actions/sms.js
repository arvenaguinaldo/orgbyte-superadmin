import {SMSS} from 'constants/actions/sms';

export const fetchSmss = params => ({
  type: SMSS.FETCH_SMSS,
  params
});

export const fetchSmssSuccess = response => ({
  type: SMSS.FETCH_SMSS_SUCCESS,
  response
});

export const fetchSms = params => ({
  type: SMSS.FETCH_SMS,
  params
});

export const fetchSmsSuccess = response => ({
  type: SMSS.FETCH_SMS_SUCCESS,
  response
});

export const createSms = params => ({
  type: SMSS.CREATE_SMS,
  params
});

export const createSmsSuccess = response => ({
  type: SMSS.CREATE_SMS_SUCCESS,
  response
});
