import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Sitebar from "./components/Sitebar";
import AddProduct from "./screens/AddProduct";
import AllProducts from "./screens/AllProducts";
import AddPayment from "./screens/AddPayment";

function App() {
  return (
    <div className="flex flex-wrap md:flex-nowrap">
      <Router>
        <header>
          <Header />
          <Sitebar />
        </header>
        <main className="mt-14 pt-5 px-5 w-full h-screen bg-white text-gray-700">          
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/allproducts" component={AllProducts} />
            <Route path="/addpayment" component={AddPayment} />          
        </main>

        {/* footer */}
      </Router>
    </div>
  );
}

export default App;
