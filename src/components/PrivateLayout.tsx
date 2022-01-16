import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Sitebar from "./Sitebar";
import ChatWrapper from "./ChatWrapper";
import AddProduct from "../screens/AddProduct";
import AllProducts from "../screens/AllProducts";
import AllPayment from "../screens/AllPayment";
import AddPayment from "../screens/AddPayment";
import AllDeliveryMethod from "../screens/AllDeliveryMethod";
import AddDeliveryMethod from "../screens/AddDeliveryMethod";
import ContactMessage from "../screens/ContactMessage";
import AllCategories from "../screens/AllCategories";
import AddCategory from "../screens/AddCategory";

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
  }, [history]);

  return (
    <>
      <header>
        <Header />
        <Sitebar />
      </header>
      <main className="mt-14 pt-5 px-5 w-full h-screen bg-white text-gray-700">
        <Switch>
          <Route path="/add-product" component={AddProduct} />
          <Route path="/products" component={AllProducts} />
          <Route path="/payments" component={AllPayment} />
          <Route path="/add-payment" component={AddPayment} />
          <Route path="/edit-payment/:id" component={AddPayment} />
          <Route path="/delivery-method" component={AllDeliveryMethod} />
          <Route path="/add-delivery" component={AddDeliveryMethod} />
          <Route path="/edit-delivery/:id" component={AddDeliveryMethod} />
          <Route path="/categories" component={AllCategories} />
          <Route path="/add-category" component={AddCategory} />
          <Route path="/edit-category/:id" component={AddCategory} />
          <Route path="/contact-message" component={ContactMessage} />
        </Switch>
      </main>
      {/* chats */}
      <ChatWrapper />
      {/* footer */}
    </>
  );
}

export default PrivateLayout;
