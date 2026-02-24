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

import Login from "./components/landingPage/login";
import Admin from "./components/pages/AdminAccount/Admin";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import RecentActivity from "./components/pages/RecentActivity/RecentActivity";
import ForgotPassword from "./components/landingPage/forgotpassword";
import Path from "./path/Path";

import BmpowerHO from "./components/pages/BMPOWER/BmpowerHO";
import AsianStreak from "./components/pages/BMPOWER/AsianStreak";
import EcossentialFoods from "./components/pages/BMPOWER/EcossentialFoods";
import EcossentialFoodsHO from "./components/pages/BMPOWER/EcossentialFoodsHO";
import EcossentialfoodsCOORS from "./components/pages/BMPOWER/EcossentialFoodsCOORS";
import Engkanto from "./components/pages/BMPOWER/Engkanto";
import Magis from "./components/pages/BMPOWER/Magis";
import Mckenzie from "./components/pages/BMPOWER/Mckenzie";
import PLDT from "./components/pages/BMPOWER/PLDT";
import SPX from "./components/pages/BMPOWER/SPX";
import UnionGalvasteel from "./components/pages/BMPOWER/UnionGalvasteel";
import Mandom from "./components/pages/BMPOWER/Mandom";
import DelMonte from "./components/pages/BMPOWER/DelMonte";

import MarabouHO from "./components/pages/MARABOU/MarabouHO";
import Longtable from "./components/pages/MARABOU/LongTable";
import CarmensBest from "./components/pages/MARABOU/CarmensBest";
import MetroPacific from "./components/pages/MARABOU/MetroPacific";
import MetroPacificFresh from "./components/pages/MARABOU/MetroPacificFresh";
import UniversalHarvester from "./components/pages/MARABOU/UniversalHarvester";
import Jgyu from "./components/pages/MARABOU/J-GYU";
import Cosmetic from "./components/pages/MARABOU/CosmeticAsia";

import AccountCreationEmployee from "./components/pages/AccountCreationEmployee/AccountCreationEmployee";
import AccountCreationProfile from "./components/pages/AccountCreationProfileclient/AccountCreationProfileclient";
import ViewClientProfile from "./components/pages/ViewClientProfile/ViewClientProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Path />}>
          {/* LOGIN */}

          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route path="/view-dashboard" element={<Dashboard />} />
          <Route path="/view-admin-accounts" element={<Admin />} />
          <Route path="/view-recent-activity" element={<RecentActivity />} />
          <Route
            path="/view-AccountCreationEmployee"
            element={<AccountCreationEmployee />}
          />
          <Route
            path="/view-AccountCreationProfileclient"
            element={<AccountCreationProfile />}
          />
          <Route path="/view-clientProfile" element={<ViewClientProfile />} />

          {/* BMPOWER */}

          <Route path="/view-bmpowerHO" element={<BmpowerHO />} />
          <Route path="/view-asianstreak" element={<AsianStreak />} />
          <Route path="/view-ecossentialfoods" element={<EcossentialFoods />} />
          <Route
            path="/view-ecossentialfoodsHO"
            element={<EcossentialFoodsHO />}
          />
          <Route
            path="/view-ecossentialfoodsCOORS"
            element={<EcossentialfoodsCOORS />}
          />
          <Route path="/view-engkanto" element={<Engkanto />} />
          <Route path="/view-magis" element={<Magis />} />
          <Route path="/view-mckenzie" element={<Mckenzie />} />
          <Route path="/view-pldt" element={<PLDT />} />
          <Route path="/view-spx" element={<SPX />} />
          <Route path="/view-delmonte" element={<DelMonte />} />
          <Route path="/view-mandom" element={<Mandom />} />
          <Route path="/view-galvasteel" element={<UnionGalvasteel />} />

          {/* MARABOU */}

          <Route path="/view-marabouHO" element={<MarabouHO />} />
          <Route path="/view-longtable" element={<Longtable />} />
          <Route path="/view-carmensbest" element={<CarmensBest />} />
          <Route path="/view-metropacific" element={<MetroPacific />} />
          <Route
            path="/view-metropacificfresh"
            element={<MetroPacificFresh />}
          />
          <Route
            path="/view-universalharvester"
            element={<UniversalHarvester />}
          />
          <Route path="/view-jgyu" element={<Jgyu />} />
          <Route path="/view-cosmetic" element={<Cosmetic />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
