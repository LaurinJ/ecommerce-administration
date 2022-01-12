import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers/index";

type Props = {
  children?: JSX.Element | JSX.Element[] | React.Component;
};

function PrivateRoute({ children }: Props): any {
  const userLogin = useSelector((state: RootState) => state.user);
  const { user } = userLogin;

  const history = useHistory();
  useEffect(() => {
    if (!user) {
      console.log(user);
      history.push("/account/login");
    }
  }, [history, user]);
  // if (!user) {
  //   return <Redirect to={"/account/login"} />;
  // }

  return children;
}

export default PrivateRoute;
