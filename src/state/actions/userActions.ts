import { ActionUserType } from "../action-types/index";

interface LoginRequestAction {
  type: ActionUserType.USER_LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: ActionUserType.USER_LOGIN_SUCCESS;
  payload: any;
}

interface LoginFailAction {
  type: ActionUserType.USER_LOGIN_FAIL;
  payload: any;
}

interface LogoutAction {
  type: ActionUserType.USER_LOGOUT;
}

export type Action =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction;
