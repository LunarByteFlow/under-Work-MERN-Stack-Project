import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterUser from "./components/RegisterUser";
import { UserContextprovider } from "./userContext";
import Account from "./components/Account";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextprovider>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            ></Route>
            <Route
              exact
              path="/login"
              element={
                <>
                  <LoginPage />
                </>
              }
            ></Route>
            <Route
              exact
              path="/register"
              element={
                <>
                  <RegisterUser />
                </>
              }
            ></Route>
            <Route
              exact
              path="/account/:subpage?"
              element={
                <>
                  <Account/>
                </>
              }
            ></Route>
            <Route
              exact
              path="/account/:subpage/:action"
              element={
                <>
                  <Account/>
                </>
              }
            ></Route>
            
          </Routes>
        </UserContextprovider>
      </BrowserRouter>
    </div>
  );
}

export default App;
