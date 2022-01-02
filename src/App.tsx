import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Sitebar from "./components/Sitebar";
import Chat from "./components/Chat";
import AddProduct from "./screens/AddProduct";
import AllProducts from "./screens/AllProducts";
import AllPayment from "./screens/AllPayment";
import AddPayment from "./screens/AddPayment";
import AllDeliverMethod from "./screens/AllDeliverMethod";
import AddDeliverMethod from "./screens/AddDeliverMethod";

function App() {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap">
        <Router>
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
          </main>

          {/* <Chat /> */}
          {/* footer */}
        </Router>
      </div>
      <Chat />
    </>
  );
}

export default App;
