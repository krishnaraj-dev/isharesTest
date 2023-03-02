import { all, fork } from "redux-saga/effects";

import isharesSaga from "./ishares/sagas";

export function* rootSaga() {
  yield all([fork(isharesSaga)]);
}
