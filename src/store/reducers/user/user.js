import {AuthorizationStatus} from "../../../const";
import {ActionType} from "../../action/action";

export const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.LOAD_AUTH_INFO:
      return Object.assign({}, state, {
        authInfo: action.payload
      });
  }

  return state;
};

export {user};
