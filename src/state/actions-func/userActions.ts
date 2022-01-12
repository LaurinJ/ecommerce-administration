import { Dispatch } from "redux";
import { ActionUserType } from "../action-types";
import { Action } from "../actions/userActions";

export const login = (data: any) => async (dispatch: Dispatch<Action>) => {
  try {
    //   dispatch({
    //     type: ActionUserType.USER_LOGIN_REQUEST,
    //   });
    dispatch({
      type: ActionUserType.USER_LOGIN_SUCCESS,
      payload: { ...data },
    });

    // localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    // dispatch({
    //     type: ActionUserType.USER_LOGIN_FAIL,
    //     payload: error.response && error.response.data.detail
    //         ? error.response.data.detail
    //         : error.message,
    // })
  }
};
