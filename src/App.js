import Header from "./components/Header";
// import Navbar from "./components/Navbar";
import Sitebar from "./components/Sitebar";
// import moduleName from 'react'

function App() {
  return (
    <div className="flex">
      <Header />
      {/* <Navbar /> */}
      <Sitebar />

      <div className="mt-14 pt-5 px-5 w-full h-screen bg-gray-300 text-gray-700">
        <h1 className="text-2xl">Add New Product</h1>
        <div className="mt-5">
          <form className="flex justify-between">
            <div className="w-3/5">
              <div class="">
                {/* <label for="inputEmail4" className="mr-2">
                Email
              </label>
              <hr />
              <br /> */}
                <input
                  type="text"
                  className="w-full p-3 bg-gray-100"
                  placeholder="Nadpis produktu"
                />
              </div>

              <div class="mt-4">
                {/* <label for="inputAddress">Address</label> */}
                <input
                  type="text"
                  className="w-full p-3 bg-gray-100"
                  id="inputAddress"
                  placeholder="URL adresa"
                />
              </div>
              <div class="mt-4">
                <label for="inputAddress2" className="mr-3">
                  Cena:
                </label>
                <input
                  type="number"
                  class="w-20 mr-1 p-3 bg-gray-100"
                  id="inputAddress2"
                  placeholder="Cena"
                />
                Kč
                <label for="inputAddress2" className="mx-3">
                  Před:
                </label>
                <input
                  type="number"
                  class="w-20 p-3 mr-1 bg-gray-100"
                  id="inputAddress2"
                  placeholder="Cena"
                />
                Kč
              </div>
              {/* popis */}
              <div class="mt-4">
                {/* <label for="inputCity">City</label> */}
                <textarea
                  rows="2"
                  cols="50"
                  name="sm-popis"
                  class="w-full p-3 bg-gray-100"
                  placeholder="Krátký popis..."
                />
              </div>
            </div>

            <div className="w-96 h-80 bg-white">
              <div class="mt-4 ml-4">
                <label for="inputState">Kategorie:</label>
                <select id="inputState" class="ml-2 w-56 p-3 bg-gray-100">
                  <option selected>Akční</option>
                  <option>Dobrodružné</option>
                  <option>RPG</option>
                  <option>Strategie</option>
                </select>
                <div class="mt-4 ">
                  <label class="mr-3" for="gridCheck">
                    Zobrazit:
                  </label>
                  <input class="w-5 h-5 bg-green-400 text-black" type="checkbox" id="gridCheck" />
                </div>
              </div>
            </div>

            {/* <div>
              <div class="mt-20">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip" />
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck" />
                <label class="form-check-label" for="gridCheck">
                  Check me out
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
              Sign in
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
