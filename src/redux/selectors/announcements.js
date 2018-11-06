import {createSelector} from 'reselect';

export const selectAnnouncements = state => state.announcements;

export const makeSelectAnnouncements = () => createSelector(
  selectAnnouncements,
  announcements => announcements.toJS()
);

export const makeSelectAnnouncementsList = () => createSelector(
  makeSelectAnnouncements(),
  announcements => announcements.list
);

export const makeSelectAnnouncement = () => createSelector(
  makeSelectAnnouncements(),
  announcements => announcements.announcement
);

export const makeSelectAnnouncementsMeta = () => createSelector(
  makeSelectAnnouncements(),
  announcements => announcements.meta
);
