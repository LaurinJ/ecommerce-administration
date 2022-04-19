import React, { useContext, useReducer } from "react";
import { v4 } from "uuid";
import reducer from "../reducer/notificationReducer";
import NotificationContext from "./NotificationContext";
import Notification from "../components/Notification";

const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={"notification-wrapper z-30"}>
        {state.map((note) => {
          return <Notification dispatch={dispatch} key={note.id} {...note} />;
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export default NotificationProvider;
