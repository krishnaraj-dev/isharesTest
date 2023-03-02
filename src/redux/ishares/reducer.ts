import {
  FETCH_ISHARES_REQUEST,
  FETCH_ISHARES_SUCCESS,
  FETCH_ISHARES_FAILURE,
} from "./actionTypes";

import { IsharesActions, IsharesState } from "./types";

const initialState: IsharesState = {
  loading: false,
  Ishares: [],
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: IsharesActions) => {
  switch (action.type) {
    case FETCH_ISHARES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ISHARES_SUCCESS:
      return {
        ...state,
        loading: false,
        Ishares: action.payload.Ishares,
        error: null,
      };
    case FETCH_ISHARES_FAILURE:
      return {
        ...state,
        loading: false,
        Ishares: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
