import {ARCHIVE} from 'constants/actions/archive';

export const fetchArchive = params => ({
  type: ARCHIVE.FETCH_ARCHIVES,
  params
});

export const fetchArchiveSuccess = response => ({
  type: ARCHIVE.FETCH_ARCHIVES_SUCCESS,
  response
});

export const archive = params => ({
  type: ARCHIVE.ARCHIVE,
  params
});

export const archiveSuccess = response => ({
  type: ARCHIVE.ARCHIVE_SUCCESS,
  response
});
