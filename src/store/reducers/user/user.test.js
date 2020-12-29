import {user as userReducer, initialState as userReducerInitialState} from "./user";
import {ActionType} from "../../action/action";
import {AuthorizationStatus} from "../../../const";
import mockAuthInfo from "../../../mocks/authData";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(userReducer(void 0, {})).toEqual(userReducerInitialState);
});

it(`Reducer should authorizationStatus by changing auth status`, () => {
  expect(userReducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH
  });
});

it(`Reducer should authorizationStatus by changing auth status`, () => {
  expect(userReducer({
    authInfo: {}
  }, {
    type: ActionType.LOAD_AUTH_INFO,
    payload: mockAuthInfo,
  })).toEqual({
    authInfo: mockAuthInfo
  });
});
