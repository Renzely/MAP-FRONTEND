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

import Login from "./components/Admin/login";
import Admin from "./components/pages/AdminAccount/Admin";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import RecentActivity from "./components/pages/RecentActivity/RecentActivity";
import ForgotPassword from "./components/Admin/forgotpassword";
import Path from "./path/Path";

import BmpowerHO from "./components/pages/BMPOWER/BmpowerHO";
import AsianStreak from "./components/pages/BMPOWER/AsianStreak";
import EcossentialFoods from "./components/pages/BMPOWER/EcossentialFoods";
import EcossentialFoodsHO from "./components/pages/BMPOWER/EcossentialFoodsHO";
import Engkanto from "./components/pages/BMPOWER/Engkanto";
import Magis from "./components/pages/BMPOWER/Magis";
import Mckenzie from "./components/pages/BMPOWER/Mckenzie";
import PLDT from "./components/pages/BMPOWER/PLDT";
import RoyalCanin from "./components/pages/BMPOWER/RoyalCanin";
import Shelfmate from "./components/pages/BMPOWER/Shelfmate";
import SPX from "./components/pages/BMPOWER/SPX";
import UnionGalvasteel from "./components/pages/BMPOWER/UnionGalvasteel";

import MarabouHO from "./components/pages/MARABOU/MarabouHO";
import Longtable from "./components/pages/MARABOU/LongTable";
import CarmensBest from "./components/pages/MARABOU/CarmensBest";
import MetroPacific from "./components/pages/MARABOU/MetroPacific";
import MetroPacificFresh from "./components/pages/MARABOU/MetroPacificFresh";
import UniversalHarvester from "./components/pages/MARABOU/UniversalHarvester";
import Jgyu from "./components/pages/MARABOU/J-GYU";
import AccountCreation from "./components/pages/account/AccountCreation";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Path />}>
          <Route path="/" element={<Login />} />
          <Route path="/view-dashboard" element={<Dashboard />} />
          <Route path="/view-admin-accounts" element={<Admin />} />
          <Route path="/view-recent-activity" element={<RecentActivity />} />
          <Route path="/view-accounts" element={<AccountCreation />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route path="/view-bmpowerHO" element={<BmpowerHO />} />
          <Route path="/view-asianstreak" element={<AsianStreak />} />
          <Route path="/view-ecossentialfoods" element={<EcossentialFoods />} />
          <Route
            path="/view-ecossentialfoodsHO"
            element={<EcossentialFoodsHO />}
          />
          <Route path="/view-engkanto" element={<Engkanto />} />
          <Route path="/view-magis" element={<Magis />} />
          <Route path="/view-mckenzie" element={<Mckenzie />} />
          <Route path="/view-pldt" element={<PLDT />} />
          <Route path="/view-royalcanin" element={<RoyalCanin />} />
          <Route path="/view-shelfmate" element={<Shelfmate />} />
          <Route path="/view-spx" element={<SPX />} />
          <Route path="/view-galvasteel" element={<UnionGalvasteel />} />

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
