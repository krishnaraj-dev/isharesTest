import {
  FETCH_ISHARES_REQUEST,
  FETCH_ISHARES_SUCCESS,
  FETCH_ISHARES_FAILURE,
} from "./actionTypes";

export interface IsharesProps {
  id: number;
  scrip: string;
  quantity: number;
  price: string;
  avgCost: string;
  type: string;
}

export interface IsharesState {
  loading: boolean;
  Ishares: IsharesProps[];
  error: string | null;
}

export interface FetchIsharesSuccessPayload {
  Ishares: IsharesProps[];
}

export interface FetchIsharesFailurePayload {
  error: string;
}

export interface FetchIsharesRequest {
  type: typeof FETCH_ISHARES_REQUEST;
}

export type FetchIsharesSuccess = {
  type: typeof FETCH_ISHARES_SUCCESS;
  payload: FetchIsharesSuccessPayload;
};

export type FetchIsharesFailure = {
  type: typeof FETCH_ISHARES_FAILURE;
  payload: FetchIsharesFailurePayload;
};

export type IsharesActions =
  | FetchIsharesRequest
  | FetchIsharesSuccess
  | FetchIsharesFailure;
