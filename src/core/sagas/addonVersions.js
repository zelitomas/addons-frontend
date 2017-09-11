/* @flow */
/* global Generator */
// Disabled because of
// https://github.com/benmosher/eslint-plugin-import/issues/793
/* eslint-disable import/order */
import { call, put, select, takeEvery } from 'redux-saga/effects';
/* eslint-enable import/order */

import { fetchAddonVersions as fetchAddonVersionsApi } from 'core/api';
import {
  FETCH_ADDON_VERSIONS,
  loadAddonVersions,
} from 'core/reducers/addonVersions';
import log from 'core/logger';
import type { FetchAddonVersionsAction } from 'core/reducers/addonVersions';

import { createErrorHandler, getState } from './utils';


export function* fetchAddonVersions({
  payload: { errorHandlerId, filter, slug, versionsToFetch },
}: FetchAddonVersionsAction): Generator<any, any, any> {
  const errorHandler = createErrorHandler(errorHandlerId);

  yield put(errorHandler.createClearingAction());

  try {
    const state = yield select(getState);

    const response = yield call(fetchAddonVersionsApi, {
      api: state.api,
      errorHandlerId: errorHandler.id,
      filter,
      slug,
      versionsToFetch,
    });

    yield put(loadAddonVersions({ results: response.results, slug }));
  } catch (error) {
    log.warn(`Failed to load versions for add-on with slug ${slug}: ${error}`);
    yield put(errorHandler.createErrorAction(error));
  }
}

export default function* addonVersionsSaga(): Generator<any, any, any> {
  yield takeEvery(FETCH_ADDON_VERSIONS, fetchAddonVersions);
}
