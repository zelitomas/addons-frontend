/* @flow */
export const CANCEL_FETCH_ADDON_VERSIONS = 'CANCEL_FETCH_ADDON_VERSIONS';
export const FETCH_ADDON_VERSIONS = 'FETCH_ADDON_VERSIONS';
export const LOAD_ADDON_VERSIONS = 'LOAD_ADDON_VERSIONS';

type FetchAddonVersionsParams = {|
  errorHandlerId: string,
  filter: string,
  slug: string,
  versionsToFetch: number,
|};

export type FetchAddonVersionsAction = {|
  type: string,
  payload: FetchAddonVersionsParams,
|};

export function fetchAddonVersions({
  errorHandlerId, filter, slug, versionsToFetch,
}: FetchAddonVersionsParams): FetchAddonVersionsAction {
  if (!errorHandlerId) {
    throw new Error('errorHandlerId is required');
  }
  if (!filter) {
    throw new Error('filter is required');
  }
  if (!slug) {
    throw new Error('slug is required');
  }
  if (!versionsToFetch) {
    throw new Error('versionsToFetch is required');
  }

  return {
    type: FETCH_ADDON_VERSIONS,
    payload: { errorHandlerId, filter, slug, versionsToFetch },
  };
}

export function cancelFetchAddonVersions() {
  return { type: CANCEL_FETCH_ADDON_VERSIONS };
}

export function loadAddonVersions({ results, slug }) {
  if (!results) {
    throw new Error('results are required');
  }
  if (!slug) {
    throw new Error('slug is required');
  }

  return {
    type: LOAD_ADDON_VERSIONS,
    payload: { results, slug },
  };
}

const initialState = {};

// type AddonVersionsState = {
//   [addonSlug: string]: AddonType,
// };

export default function addonsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADDON_VERSIONS:
      // const { slug } = this.props;
      return { ...state };
    case LOAD_ADDON_VERSIONS: {
      return state;
    }
    default:
      return state;
  }
}
