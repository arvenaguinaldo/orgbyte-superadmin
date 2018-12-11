import {ANNOUNCEMENTS} from 'constants/actions/announcements';

export const fetchAnnouncements = params => ({
  type: ANNOUNCEMENTS.FETCH_ANNOUNCEMENTS,
  params
});

export const fetchAnnouncementsSuccess = response => ({
  type: ANNOUNCEMENTS.FETCH_ANNOUNCEMENTS_SUCCESS,
  response
});

export const fetchAnnouncement = params => ({
  type: ANNOUNCEMENTS.FETCH_ANNOUNCEMENT,
  params
});

export const fetchAnnouncementSuccess = response => ({
  type: ANNOUNCEMENTS.FETCH_ANNOUNCEMENT_SUCCESS,
  response
});

export const createAnnouncement = (params, callback) => ({
  type: ANNOUNCEMENTS.CREATE_ANNOUNCEMENT,
  params,
  callback
});

export const createAnnouncementSuccess = response => ({
  type: ANNOUNCEMENTS.CREATE_ANNOUNCEMENT_SUCCESS,
  response
});
