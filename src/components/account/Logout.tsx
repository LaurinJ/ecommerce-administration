import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { LOGOUT_MUTATION } from "../../queries/Mutation";
import { getCookie, logout as logoutData } from "../../actions/auth";
// import { useNotification } from "../../context/NotificationProvider";

function Logout() {
  const history = useHistory();
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      logoutData();
      history.push("/account/login");
    },
  });

  const logouthandler = () => {
    const token = getCookie("refreshToken");
    logout({
      variables: {
        token: { refreshToken: token },
      },
    });
  };

  return (
    <button
      onClick={() => {
        logouthandler();
      }}
    >
      Log Out
      <i className="fa fa-sign-out ml-3" aria-hidden="true"></i>
    </button>
  );
}

export default Logout;
