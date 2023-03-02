import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPending = (state: AppState) => state.IshareState.loading;

const getIshares = (state: AppState) => state.IshareState.Ishares;

const getError = (state: AppState) => state.IshareState.error;

export const getIsharesSelector = createSelector(
  getIshares,
  (shares) => shares
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
