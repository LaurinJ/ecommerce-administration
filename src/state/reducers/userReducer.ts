import { ActionUserType } from "../action-types/index";
import { Action } from "../actions/userActions";

const initialState = {};

const reducer = (state: any = initialState, action: Action): any => {
  switch (action.type) {
    case ActionUserType.USER_LOGIN_REQUEST:
      return { loading: true };

    case ActionUserType.USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };

    case ActionUserType.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case ActionUserType.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export default reducer;
