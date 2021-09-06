import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Sitebar from "./components/Sitebar";
import AddProduct from "./screens/AddProduct";

function App() {
  return (
    <div className="flex">
      <Router>
        <header>
          <Header />
          <Sitebar />
        </header>
        <main>
          <div className="mt-14 pt-5 px-5 w-full h-screen bg-gray-300 text-gray-700">
            <Route path="/addproduct" component={AddProduct} />
          </div>
        </main>

        {/* footer */}
      </Router>
    </div>
  );
}

export default App;
