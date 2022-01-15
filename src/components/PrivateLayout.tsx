import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Sitebar from "./Sitebar";
import ChatWrapper from "./ChatWrapper";
import AddProduct from "../screens/AddProduct";
import AllProducts from "../screens/AllProducts";
import AllPayment from "../screens/AllPayment";
import AddPayment from "../screens/AddPayment";
import AllDeliverMethod from "../screens/AllDeliverMethod";
import AddDeliverMethod from "../screens/AddDeliverMethod";
import AllChats from "../screens/AllChats";

import { isAuth } from "../actions/auth";
import { userName } from "../apollo-client";

function PrivateLayout() {
  const history = useHistory();

  useEffect(() => {
    if (!isAuth()) {
      history.push("/account/login");
    } else {
      userName(isAuth().name);
    }
  }, []);

  return (
    <>
      <header>
        <Header />
        <Sitebar />
      </header>
      <main className="mt-14 pt-5 px-5 w-full h-screen bg-white text-gray-700">
        <Route path="/add-product" component={AddProduct} />
        <Route path="/products" component={AllProducts} />
        <Route path="/payments" component={AllPayment} />
        <Route path="/add-payment" component={AddPayment} />
        <Route path="/deliver-method" component={AllDeliverMethod} />
        <Route path="/add-deliver" component={AddDeliverMethod} />
        <Route path="/chats" component={AllChats} />
      </main>
      {/* chats */}
      <ChatWrapper />
      {/* footer */}
    </>
  );
}

export default PrivateLayout;
