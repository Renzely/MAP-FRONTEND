import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import "./defaultApp.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import MarabouHO from "./components/pages/MARABOU/MarabouHO";
import AccountCreation from "./components/pages/account/AccountCreation";
import BmpowerHO from "./components/pages/BMPOWER/BmpowerHO";
import Login from "./components/Admin/login";
import Admin from "./components/pages/AdminAccount/Admin";
import ForgotPassword from "./components/Admin/forgotpassword";
import Path from "./path/Path";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Path />}>
          <Route path="/" element={<Login />} />
          <Route path="/dashBoard" element={<dashBoard />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/view-bmpowerHO" element={<BmpowerHO />} />
          <Route path="/view-marabouHO" element={<MarabouHO />} />
          <Route path="/view-admin-accounts" element={<Admin />} />
          <Route path="/view-accounts" element={<AccountCreation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
