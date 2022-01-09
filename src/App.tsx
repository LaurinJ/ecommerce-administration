import { BrowserRouter as Router, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Sitebar from "./components/Sitebar";
// import ChatWrapper from "./components/ChatWrapper";
// import AddProduct from "./screens/AddProduct";
// import AllProducts from "./screens/AllProducts";
// import AllPayment from "./screens/AllPayment";
// import AddPayment from "./screens/AddPayment";
// import AllDeliverMethod from "./screens/AllDeliverMethod";
// import AddDeliverMethod from "./screens/AddDeliverMethod";
// import AllChats from "./screens/AllChats";
import Login from "./screens/account/Login";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap h-full w-full max-w-[1400px] mx-auto">
        <Router>
          <Route path="/account/login" component={Login} />
          <PrivateRoute children={<Layout />} />
        </Router>
      </div>
    </>
  );
}

export default App;
