import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import { getLocalStorage } from "../actions/auth";

const userInfoFromStorage = getLocalStorage("user")
  ? getLocalStorage("user")
  : null;

const initialState = {
  user: {
    ...userInfoFromStorage,
  },
};

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
