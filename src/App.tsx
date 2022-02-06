import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./screens/account/Login";
import PrivateLayout from "./components/PrivateLayout";

function App() {
  return (
    <>
      <Router>
        <Route path="/account/login" component={Login} />
        <div className="flex flex-wrap md:flex-nowrap h-full w-full max-w-[1400px] mx-auto bg-gray-100">
          {/* Private Layout */}
          <PrivateLayout />
        </div>
      </Router>
    </>
  );
}

export default App;
