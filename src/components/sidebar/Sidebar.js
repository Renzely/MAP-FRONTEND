import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Dashboard,
  AssignmentInd,
  ManageAccounts,
  SupervisorAccount,
  ExpandLess,
  ExpandMore,
  ListAlt,
} from "@mui/icons-material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { IconButton, Collapse, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isOpen, setOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved === "true" ? true : false;
  });
  const [openMarabou, setOpenMarabou] = useState(false);
  const [openBmpower, setOpenBmpower] = useState(false);
  const [openClientProfiles, setOpenClientProfiles] = useState(false);
  const [openAccountManagement, setOpenAccountManagement] = useState(false);

  const handleToggleMarabou = () => {
    if (!isOpen) {
      setOpen(true);
      localStorage.setItem("sidebarOpen", "true");
    }
    setOpenMarabou((prev) => !prev);
  };

  const handleToggleBmpower = () => {
    if (!isOpen) {
      setOpen(true);
      localStorage.setItem("sidebarOpen", "true");
    }
    setOpenBmpower((prev) => !prev);
  };

  const handleToggleClientProfiles = () => {
    if (!isOpen) {
      setOpen(true);
      localStorage.setItem("sidebarOpen", "true");
    }
    setOpenClientProfiles((prev) => !prev);
  };

  const handleToggleAccountManagement = () => {
    if (!isOpen) {
      setOpen(true);
      localStorage.setItem("sidebarOpen", "true");
    }
    setOpenAccountManagement((prev) => !prev);
  };

  const toggleSidebar = () => {
    const newState = !isOpen;
    setOpen(newState);
    localStorage.setItem("sidebarOpen", newState.toString());
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const roleAccount = localStorage.getItem("roleAccount");
  const fullName = localStorage.getItem("adminFullName");

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

      {/* Divider Line */}
      <hr className="sidebar-divider" />

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        <NavLink
          to="/view-dashboard"
          onClick={() => handleItemClick("/view-dashboard")}
        >
          <Tooltip title={!isOpen ? "Dashboard" : ""} placement="right" arrow>
            <li className={activeItem === "/view-dashboard" ? "active" : ""}>
              <Dashboard className="sidebar-icon" />
              {isOpen && <span className="menu-text">Dashboard</span>}
            </li>
          </Tooltip>
        </NavLink>

        <NavLink
          to="/view-AccountCreationEmployee"
          onClick={() => handleItemClick("/view-AccountCreationEmployee")}
        >
          <li
            className={
              activeItem === "/view-AccountCreationEmployee" ? "active" : ""
            }
          >
            <ManageAccounts className="sidebar-icon" />
            {isOpen && <span className="menu-text">Employee Registration</span>}
          </li>
        </NavLink>

        {["MIS", "HR HEAD"].includes(roleAccount) && (
          <NavLink
            to="/view-admin-accounts"
            onClick={() => handleItemClick("/view-admin-accounts")}
          >
            <Tooltip
              title={!isOpen ? "Admin Accounts" : ""}
              placement="right"
              arrow
            >
              <li
                className={
                  activeItem === "/view-admin-accounts" ? "active" : ""
                }
              >
                <SupervisorAccount className="sidebar-icon" />
                {isOpen && <span className="menu-text">Admin Accounts</span>}
              </li>
            </Tooltip>
          </NavLink>
        )}

        {["MIS", "HR HEAD", "EXECUTIVE DIRECTOR"].includes(roleAccount) && (
          <NavLink
            to="/view-recent-activity"
            onClick={() => handleItemClick("/view-recent-activity")}
          >
            <Tooltip
              title={!isOpen ? "Recent Activity" : ""}
              placement="right"
              arrow
            >
              <li
                className={
                  activeItem === "/view-recent-activity" ? "active" : ""
                }
              >
                <ListAlt className="sidebar-icon" />
                {isOpen && <span className="menu-text">Recent Activity</span>}
              </li>
            </Tooltip>
          </NavLink>
        )}

        {/* CLIENT PROFILES MENU */}
        {["MIS", "HR HEAD", "EXECUTIVE DIRECTOR"].includes(roleAccount) && (
          <Tooltip
            title={!isOpen ? "Client Profiles" : ""}
            placement="right"
            arrow
          >
            <li
              onClick={handleToggleClientProfiles}
              className="menu-with-submenu"
            >
              <ManageAccounts className="sidebar-icon" />
              {isOpen && (
                <>
                  <span className="menu-text">Client Profiles</span>
                  <span className="expand-icon">
                    {openClientProfiles ? <ExpandLess /> : <ExpandMore />}
                  </span>
                </>
              )}
            </li>
          </Tooltip>
        )}

        {["MIS", "HR HEAD", "EXECUTIVE DIRECTOR"].includes(roleAccount) && (
          <Collapse
            in={openClientProfiles && isOpen}
            timeout="auto"
            unmountOnExit
          >
            <div className="sidebar-submenu-scroll">
              <ul className="sidebar-submenu">
                <NavLink
                  to="/view-AccountCreationProfileclient"
                  onClick={() =>
                    handleItemClick("/view-AccountCreationProfileclient")
                  }
                >
                  <li
                    className={
                      activeItem === "/view-AccountCreationProfileclient"
                        ? "active"
                        : ""
                    }
                  >
                    <ManageAccounts className="sidebar-icon" />
                    {isOpen && (
                      <span className="menu-text">
                        Client Profile Registration
                      </span>
                    )}
                  </li>
                </NavLink>

                <NavLink
                  to="/view-clientProfile"
                  onClick={() => handleItemClick("/view-clientProfile")}
                >
                  <li
                    className={
                      activeItem === "/view-clientProfile" ? "active" : ""
                    }
                  >
                    <ManageAccounts className="sidebar-icon" />
                    {isOpen && (
                      <span className="menu-text">Client Profile</span>
                    )}
                  </li>
                </NavLink>
              </ul>
            </div>
          </Collapse>
        )}

        {/* ACCOUNT MANAGEMENT MENU */}
        <Tooltip
          title={!isOpen ? "Employee Management" : ""}
          placement="right"
          arrow
        >
          <li
            onClick={handleToggleAccountManagement}
            className="menu-with-submenu"
          >
            <ManageAccounts className="sidebar-icon" />
            {isOpen && (
              <>
                <span className="menu-text">Employee Management</span>
                <span className="expand-icon">
                  {openAccountManagement ? <ExpandLess /> : <ExpandMore />}
                </span>
              </>
            )}
          </li>
        </Tooltip>

        <Collapse
          in={openAccountManagement && isOpen}
          timeout="auto"
          unmountOnExit
        >
          <div className="sidebar-submenu-scroll">
            <ul className="sidebar-submenu">
              {/* BMPOWER SUBMENU */}
              <Tooltip title={!isOpen ? "BMPOWER" : ""} placement="right" arrow>
                <li
                  onClick={handleToggleBmpower}
                  className="menu-with-submenu submenu-nested"
                >
                  <AssignmentInd className="sidebar-icon" />
                  {isOpen && (
                    <>
                      <span className="menu-text">BMPOWER</span>
                      <span className="expand-icon">
                        {openBmpower ? <ExpandLess /> : <ExpandMore />}
                      </span>
                    </>
                  )}
                </li>
              </Tooltip>

              <Collapse in={openBmpower && isOpen} timeout="auto" unmountOnExit>
                <div className="sidebar-submenu-scroll">
                  <ul className="sidebar-submenu">
                    <NavLink
                      to="/view-bmpowerHO"
                      onClick={() => handleItemClick("/view-bmpowerHO")}
                    >
                      <li
                        className={
                          activeItem === "/view-bmpowerHO" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">BMPOWER HO</span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-asianstreak"
                      onClick={() => handleItemClick("/view-asianstreak")}
                    >
                      <li
                        className={
                          activeItem === "/view-asianstreak" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">
                            Asian Streak Brokerage CO
                          </span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-ecossentialfoods"
                      onClick={() => handleItemClick("/view-ecossentialfoods")}
                    >
                      <li
                        className={
                          activeItem === "/view-ecossentialfoods"
                            ? "active"
                            : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">Ecossential Foods</span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-ecossentialfoodsCOORS"
                      onClick={() =>
                        handleItemClick("/view-ecossentialfoodsCOORS")
                      }
                    >
                      <li
                        className={
                          activeItem === "/view-ecossentialfoodsCOORS"
                            ? "active"
                            : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">
                            Ecossential Foods COOR
                          </span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-ecossentialfoodsHO"
                      onClick={() =>
                        handleItemClick("/view-ecossentialfoodsHO")
                      }
                    >
                      <li
                        className={
                          activeItem === "/view-ecossentialfoodsHO"
                            ? "active"
                            : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">
                            Ecossential Foods HO
                          </span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-engkanto"
                      onClick={() => handleItemClick("/view-engkanto")}
                    >
                      <li
                        className={
                          activeItem === "/view-engkanto" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && <span className="menu-text">Engkanto</span>}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-magis"
                      onClick={() => handleItemClick("/view-magis")}
                    >
                      <li
                        className={activeItem === "/view-magis" ? "active" : ""}
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && <span className="menu-text">Magis</span>}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-mckenzie"
                      onClick={() => handleItemClick("/view-mckenzie")}
                    >
                      <li
                        className={
                          activeItem === "/view-mckenzie" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && <span className="menu-text">Mckenzie</span>}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-pldt"
                      onClick={() => handleItemClick("/view-pldt")}
                    >
                      <li
                        className={activeItem === "/view-pldt" ? "active" : ""}
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">PLDT Telescoop</span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-spx"
                      onClick={() => handleItemClick("/view-spx")}
                    >
                      <li
                        className={activeItem === "/view-spx" ? "active" : ""}
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">SPX Express</span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-delmonte"
                      onClick={() => handleItemClick("/view-delmonte")}
                    >
                      <li
                        className={
                          activeItem === "/view-delmonte" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && <span className="menu-text">Del Monte</span>}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-mandom"
                      onClick={() => handleItemClick("/view-mandom")}
                    >
                      <li
                        className={
                          activeItem === "/view-mandom" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && <span className="menu-text">Mandom</span>}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-galvasteel"
                      onClick={() => handleItemClick("/view-galvasteel")}
                    >
                      <li
                        className={
                          activeItem === "/view-galvasteel" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">Union Galvasteel</span>
                        )}
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </Collapse>

              {/* MARABOU SUBMENU */}
              <Tooltip title={!isOpen ? "MARABOU" : ""} placement="right" arrow>
                <li
                  onClick={handleToggleMarabou}
                  className="menu-with-submenu submenu-nested"
                >
                  <AssignmentInd className="sidebar-icon" />
                  {isOpen && (
                    <>
                      <span className="menu-text">MARABOU</span>
                      <span className="expand-icon">
                        {openMarabou ? <ExpandLess /> : <ExpandMore />}
                      </span>
                    </>
                  )}
                </li>
              </Tooltip>

              <Collapse in={openMarabou && isOpen} timeout="auto" unmountOnExit>
                <div className="sidebar-submenu-scroll">
                  <ul className="sidebar-submenu">
                    <NavLink
                      to="/view-marabouHO"
                      onClick={() => handleItemClick("/view-marabouHO")}
                    >
                      <li
                        className={
                          activeItem === "/view-marabouHO" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">Marabou HO</span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-carmensbest"
                      onClick={() => handleItemClick("/view-carmensbest")}
                    >
                      <li
                        className={
                          activeItem === "/view-carmensbest" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">Carmens Best</span>
                        )}
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
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">
                            Metro Pacific Dairy Farm
                          </span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-metropacificfresh"
                      onClick={() => handleItemClick("/view-metropacificfresh")}
                    >
                      <li
                        className={
                          activeItem === "/view-metropacificfresh"
                            ? "active"
                            : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">
                            Metro Pacific Fresh Farm
                          </span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-universalharvester"
                      onClick={() =>
                        handleItemClick("/view-universalharvester")
                      }
                    >
                      <li
                        className={
                          activeItem === "/view-universalharvester"
                            ? "active"
                            : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">
                            Universal Harvester Dairy Farm INC
                          </span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-longtable"
                      onClick={() => handleItemClick("/view-longtable")}
                    >
                      <li
                        className={
                          activeItem === "/view-longtable" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">
                            Long Table - Masajiro
                          </span>
                        )}
                      </li>
                    </NavLink>

                    <NavLink
                      to="/view-jgyu"
                      onClick={() => handleItemClick("/view-jgyu")}
                    >
                      <li
                        className={activeItem === "/view-jgyu" ? "active" : ""}
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && <span className="menu-text">J-GYU INC</span>}
                      </li>
                    </NavLink>
                    <NavLink
                      to="/view-cosmetic"
                      onClick={() => handleItemClick("/view-cosmetic")}
                    >
                      <li
                        className={
                          activeItem === "/view-cosmetic" ? "active" : ""
                        }
                      >
                        <AssignmentInd className="sidebar-icon" />
                        {isOpen && (
                          <span className="menu-text">Cosmetique Asia</span>
                        )}
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </Collapse>
            </ul>
          </div>
        </Collapse>
      </ul>
    </div>
  );
}
