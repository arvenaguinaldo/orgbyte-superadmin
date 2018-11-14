import {EMAILS} from 'constants/actions/emails';

export const fetchEmails = params => ({
  type: EMAILS.FETCH_EMAILS,
  params
});

export const fetchEmailsSuccess = response => ({
  type: EMAILS.FETCH_EMAILS_SUCCESS,
  response
});

export const fetchEmail = params => ({
  type: EMAILS.FETCH_EMAIL,
  params
});

export const fetchEmailSuccess = response => ({
  type: EMAILS.FETCH_EMAIL_SUCCESS,
  response
});

export const createEmail = params => ({
  type: EMAILS.CREATE_EMAIL,
  params
});

export const createEmailSuccess = response => ({
  type: EMAILS.CREATE_EMAIL_SUCCESS,
  response
});

export const sendCertificate = params => ({
  type: EMAILS.SEND_CERTIFICATE,
  params
});

export const sendCertificateSuccess = response => ({
  type: EMAILS.SEND_CERTIFICATE_SUCCESS,
  response
});

