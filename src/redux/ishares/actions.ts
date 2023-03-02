import {
  FETCH_ISHARES_REQUEST,
  FETCH_ISHARES_FAILURE,
  FETCH_ISHARES_SUCCESS,
} from "./actionTypes";
import {
  FetchIsharesRequest,
  FetchIsharesSuccess,
  FetchIsharesSuccessPayload,
  FetchIsharesFailure,
  FetchIsharesFailurePayload,
} from "./types";

export const fetchIsharesRequest = (): FetchIsharesRequest => ({
  type: FETCH_ISHARES_REQUEST,
});

export const fetchIsharesSuccess = (
  payload: FetchIsharesSuccessPayload
): FetchIsharesSuccess => ({
  type: FETCH_ISHARES_SUCCESS,
  payload,
});

export const fetchIsharesFailure = (
  payload: FetchIsharesFailurePayload
): FetchIsharesFailure => ({
  type: FETCH_ISHARES_FAILURE,
  payload,
});
