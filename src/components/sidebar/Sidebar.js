import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Dashboard,
  AssignmentInd,
  ManageAccounts,
  Logout,
  SupervisorAccount,
  ExpandLess,
  ExpandMore,
  ListAlt,
} from "@mui/icons-material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import {
  Avatar,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isOpen, setOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved === "true" ? true : false; // Defaults to false if not set
  });
  // Add state for collapse toggle
  const [openMarabou, setOpenMarabou] = useState(false);

  const handleToggleMarabou = () => {
    setOpenMarabou((prev) => !prev);
  };

  const [openBmpower, setOpenBmpower] = useState(false);

  const handleToggleBmpower = () => {
    setOpenBmpower((prev) => !prev);
  };

  const toggleSidebar = () => {
    const newState = !isOpen;
    setOpen(newState);
    localStorage.setItem("sidebarOpen", newState.toString());
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    // Removed the line that closes the sidebar
    // setOpen(false); // This was causing the sidebar to close on navigation
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const roleAccount = localStorage.getItem("roleAccount");
  const firstName = localStorage.getItem("firstName");

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""}`}
      style={{ minHeight: "auto" }}
    >
      {/* Toggle Button */}
      <div className="sidebar-header">
        <IconButton onClick={toggleSidebar} className="menu-button">
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </div>

      {/* User Info */}
      <div className="sidebar-user">
        <Avatar
          className="sidebar-avatar"
          sx={{ color: "black", backgroundColor: "#90e0ef" }}
        />
        {isOpen && (
          <div className="user-info">
            <Typography variant="body1" className="sidebar-name">
              {firstName}
            </Typography>
            <Typography variant="body2" className="sidebar-role">
              {roleAccount}
            </Typography>
          </div>
        )}
      </div>

      {/* Divider Line */}
      <hr className="sidebar-divider" />

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        <NavLink
          to="/view-dashboard"
          onClick={() => handleItemClick("/view-dashboard")}
        >
          <li className={activeItem === "/view-dashboard" ? "active" : ""}>
            <Dashboard className="sidebar-icon" /> {isOpen && "Dashboard"}
          </li>
        </NavLink>

        <NavLink
          to="/view-accounts"
          onClick={() => handleItemClick("/view-accounts")}
        >
          <li className={activeItem === "/view-accounts" ? "active" : ""}>
            <ManageAccounts className="sidebar-icon" />{" "}
            {isOpen && "Account Creation"}
          </li>
        </NavLink>

        {["MIS", "HR HEAD", "HR OFFICER"].includes(roleAccount) && (
          <NavLink
            to="/view-admin-accounts"
            onClick={() => handleItemClick("/view-admin-accounts")}
          >
            <li
              className={activeItem === "/view-admin-accounts" ? "active" : ""}
            >
              <SupervisorAccount className="sidebar-icon" />{" "}
              {isOpen && "Admin Accounts"}
            </li>
          </NavLink>
        )}

        {["MIS", "HR HEAD"].includes(roleAccount) && (
          <NavLink
            to="/view-recent-activity"
            onClick={() => handleItemClick("/view-recent-activity")}
          >
            <li
              className={activeItem === "/view-recent-activity" ? "active" : ""}
            >
              <ListAlt className="sidebar-icon" /> {isOpen && "Recent Activity"}
            </li>
          </NavLink>
        )}

        <li
          className={activeItem === "/view-bmpowerHO" ? "active" : ""}
          onClick={handleToggleBmpower}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AssignmentInd className="sidebar-icon" />
          {isOpen && (
            <>
              <span style={{ flexGrow: 1 }}>BMPOWER</span>
              {openBmpower ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </li>

        <Collapse in={openBmpower} timeout="auto" unmountOnExit>
          <div className="sidebar-submenu-scroll">
            <ul className="sidebar-submenu">
              <NavLink
                to="/view-bmpowerHO"
                onClick={() => handleItemClick("/view-bmpowerHO")}
              >
                <li
                  className={activeItem === "/view-bmpowerHO" ? "active" : ""}
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "BMPOWER HO"}
                </li>
              </NavLink>

              <NavLink
                to="/view-asianstreak"
                onClick={() => handleItemClick("/view-asianstreak")}
              >
                <li
                  className={activeItem === "/view-asianstreak" ? "active" : ""}
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Asian Streak Brokerage CO"}
                </li>
              </NavLink>
              <NavLink
                to="/view-ecossentialfoods"
                onClick={() => handleItemClick("/view-ecossentialfoods")}
              >
                <li
                  className={
                    activeItem === "/view-ecossentialfoods" ? "active" : ""
                  }
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Ecossential Foods"}
                </li>
              </NavLink>
              <NavLink
                to="/view-ecossentialfoodsHO"
                onClick={() => handleItemClick("/view-ecossentialfoodsHO")}
              >
                <li
                  className={
                    activeItem === "/view-ecossentialfoodsHO" ? "active" : ""
                  }
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Ecossential Foods HO"}
                </li>
              </NavLink>
              <NavLink
                to="/view-engkanto"
                onClick={() => handleItemClick("/view-engkanto")}
              >
                <li className={activeItem === "/view-engkanto" ? "active" : ""}>
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Engkanto"}
                </li>
              </NavLink>
              <NavLink
                to="/view-magis"
                onClick={() => handleItemClick("/view-magis")}
              >
                <li className={activeItem === "/view-magis" ? "active" : ""}>
                  <AssignmentInd className="sidebar-icon" /> {isOpen && "Magis"}
                </li>
              </NavLink>
              <NavLink
                to="/view-mckenzie"
                onClick={() => handleItemClick("/view-mckenzie")}
              >
                <li className={activeItem === "/view-mckenzie" ? "active" : ""}>
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Mckenzie"}
                </li>
              </NavLink>
              <NavLink
                to="/view-pldt"
                onClick={() => handleItemClick("/view-pldt")}
              >
                <li className={activeItem === "/view-pldt" ? "active" : ""}>
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "PLDT Telescoop"}
                </li>
              </NavLink>
              <NavLink
                to="/view-royalcanin"
                onClick={() => handleItemClick("/view-royalcanin")}
              >
                <li
                  className={activeItem === "/view-royalcanin" ? "active" : ""}
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Royal Canin Phils."}
                </li>
              </NavLink>
              <NavLink
                to="/view-shelfmate"
                onClick={() => handleItemClick("/view-shelfmate")}
              >
                <li
                  className={activeItem === "/view-shelfmate" ? "active" : ""}
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Shelfmate"}
                </li>
              </NavLink>
              <NavLink
                to="/view-spx"
                onClick={() => handleItemClick("/view-spx")}
              >
                <li className={activeItem === "/view-spx" ? "active" : ""}>
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "SPX Express"}
                </li>
              </NavLink>
            </ul>
          </div>
        </Collapse>

        {/* Marabou Section */}
        <li
          className={activeItem === "/view-marabouHO" ? "active" : ""}
          onClick={handleToggleMarabou}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AssignmentInd className="sidebar-icon" />
          {isOpen && (
            <>
              <span style={{ flexGrow: 1 }}>MARABOU</span>
              {openMarabou ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </li>

        {/* Collapsible Clients */}
        <Collapse in={openMarabou} timeout="auto" unmountOnExit>
          <div className="sidebar-submenu-scroll">
            <ul className="sidebar-submenu">
              <NavLink
                to="/view-marabouHO"
                onClick={() => handleItemClick("/view-marabouHO")}
              >
                <li
                  className={activeItem === "/view-marabouHO" ? "active" : ""}
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Marabou HO"}
                </li>
              </NavLink>
              <NavLink
                to="/view-carmensbest"
                onClick={() => handleItemClick("/view-carmensbest")}
              >
                <li
                  className={activeItem === "/view-carmensbest" ? "active" : ""}
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Carmens Best"}
                </li>
              </NavLink>
              <NavLink
                to="/view-metropacific"
                onClick={() => handleItemClick("/view-metropacific")}
              >
                <li
                  className={
                    activeItem === "/view-metropacific" ? "active" : ""
                  }
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Metro Pacific Dairy Farm"}
                </li>
              </NavLink>
              <NavLink
                to="/view-metropacificfresh"
                onClick={() => handleItemClick("/view-metropacificfresh")}
              >
                <li
                  className={
                    activeItem === "/view-metropacificfresh" ? "active" : ""
                  }
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Metro Pacific Fresh Farm"}
                </li>
              </NavLink>
              <NavLink
                to="/view-universalharvester"
                onClick={() => handleItemClick("/view-universalharvester")}
              >
                <li
                  className={
                    activeItem === "/view-universalharvester" ? "active" : ""
                  }
                >
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "Universal Harvester Dairy Farm INC"}
                </li>
              </NavLink>
              <NavLink
                to="/view-jgyu"
                onClick={() => handleItemClick("/view-jgyu")}
              >
                <li className={activeItem === "/view-jgyu" ? "active" : ""}>
                  <AssignmentInd className="sidebar-icon" />{" "}
                  {isOpen && "J-GYU INC"}
                </li>
              </NavLink>

              {/* Add the rest of your submenu items here */}
            </ul>
          </div>
        </Collapse>

        {/* <NavLink
          to="/attendance"
          onClick={() => handleItemClick("/attendance")}
        >
          <li className={activeItem === "/attendance" ? "active" : ""}>
            <AssignmentInd className="sidebar-icon" /> {isOpen && "Attendance"}
          </li>
        </NavLink> */}

        {/* <NavLink
          to="/view-competitors"
          onClick={() => handleItemClick("/view-competitors")}
        >
          <li className={activeItem === "/view-competitors" ? "active" : ""}>
            <WarehouseIcon className="sidebar-icon" /> {isOpen && "Competitors"}
          </li>
        </NavLink> */}

        {/* <NavLink to="/view-VET" onClick={() => handleItemClick("/view-VET")}>
          <li className={activeItem === "/view-VET" ? "active" : ""}>
            <Checklist className="sidebar-icon" /> {isOpen && "VET"}
          </li>
        </NavLink> */}
        {/* <NavLink to="/view-PSR" onClick={() => handleItemClick("/view-PSR")}>
          <li className={activeItem === "/view-PSR" ? "active" : ""}>
            <Checklist className="sidebar-icon" /> {isOpen && "PSR"}
          </li>
        </NavLink> */}

        {/* <NavLink
          to="/view-Expiry"
          onClick={() => handleItemClick("/view-Expiry")}
        >
          <li className={activeItem === "/view-Expiry" ? "active" : ""}>
            <AutoDeleteIcon className="sidebar-icon" /> {isOpen && "Expiry"}
          </li>
        </NavLink> */}

        {/* Logout */}
        <li className="logout" onClick={handleLogout}>
          <Logout className="sidebar-icon" /> {isOpen && "Logout"}
        </li>
      </ul>
    </div>
  );
}
