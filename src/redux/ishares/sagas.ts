import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchIsharesFailure, fetchIsharesSuccess } from "./actions";
import { FETCH_ISHARES_REQUEST } from "./actionTypes";
import { IsharesProps } from "./types";
import { IsharesData } from "./__fixture__/IsharesData";

const getIsharesData = () => {
  // TODO : API call here
  return IsharesData;
};

/*
  Worker Saga: Fired on FETCH_ISHARES_REQUEST action
*/
function* fetchIsharesSaga() {
  try {
    const response: IsharesProps[] = yield call(getIsharesData);
    yield put(
      fetchIsharesSuccess({
        Ishares: response,
      })
    );
  } catch (e: any) {
    yield put(
      fetchIsharesFailure({
        error: e.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_ISHARES_REQUEST` action.
  Allows concurrent increments.
*/
function* IsharesSaga() {
  yield all([takeLatest(FETCH_ISHARES_REQUEST, fetchIsharesSaga)]);
}

export default IsharesSaga;
