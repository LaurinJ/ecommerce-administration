import React, { useEffect, ComponentType } from "react";
import { Redirect } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[] | React.Component;
};

function PrivateRoute({ children }: Props): any {
  // useEffect(() => {

  // }, []);
  if (false) {
    return <Redirect to={"/account/login"} />;
  }

  return children;
}

export default PrivateRoute;
