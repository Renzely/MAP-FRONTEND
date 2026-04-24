// Sidebar.jsx — clean renderer, zero role logic here
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse, IconButton, Tooltip } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { NAV_CONFIG } from "./sidebarConfig";
import "./sidebar.css";

// ── access check ──────────────────────────────────────────
function hasAccess(allowedRoles, role) {
  if (!allowedRoles) return true; // null = public
  return allowedRoles.includes(role);
}

// Filter the entire tree for this role (removes items AND prunes empty parents)
function filterNav(items, role) {
  return items.reduce((acc, item) => {
    if (!hasAccess(item.allowedRoles, role)) return acc;

    if (item.children) {
      const visibleChildren = filterNav(item.children, role);
      if (visibleChildren.length === 0) return acc; // hide parent if no kids
      acc.push({ ...item, children: visibleChildren });
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

// ── recursive nav item ────────────────────────────────────
function NavItem({ item, isOpen, depth = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;
  const hasChildren = item.children?.length > 0;
  const indent = depth * 12;

  if (hasChildren) {
    return (
      <>
        <Tooltip title={!isOpen ? item.label : ""} placement="right" arrow>
          <li
            className="menu-with-submenu"
            style={{ paddingLeft: indent }}
            onClick={() => setExpanded((p) => !p)}
          >
            <Icon className="sidebar-icon" />
            {isOpen && (
              <>
                <span className="menu-text">{item.label}</span>
                <span className="expand-icon">
                  {expanded ? <ExpandLess /> : <ExpandMore />}
                </span>
              </>
            )}
          </li>
        </Tooltip>

        <Collapse in={expanded && isOpen} timeout="auto" unmountOnExit>
          <div className="sidebar-submenu-scroll">
            <ul className="sidebar-submenu">
              {item.children.map((child) => (
                <NavItem
                  key={child.path ?? child.label}
                  item={child}
                  isOpen={isOpen}
                  depth={depth + 1}
                />
              ))}
            </ul>
          </div>
        </Collapse>
      </>
    );
  }

  return (
    <NavLink to={item.path}>
      {({ isActive }) => (
        <Tooltip title={!isOpen ? item.label : ""} placement="right" arrow>
          <li
            className={isActive ? "active" : ""}
            style={{ paddingLeft: indent }}
          >
            <Icon className="sidebar-icon" />
            {isOpen && <span className="menu-text">{item.label}</span>}
          </li>
        </Tooltip>
      )}
    </NavLink>
  );
}

// ── sidebar ───────────────────────────────────────────────
export default function Sidebar() {
  const roleAccount = localStorage.getItem("roleAccount");

  const [isOpen, setOpen] = useState(
    () => localStorage.getItem("sidebarOpen") === "true",
  );

  const toggleSidebar = () => {
    setOpen((prev) => {
      localStorage.setItem("sidebarOpen", String(!prev));
      return !prev;
    });
  };

  // compute once per render — only items this role can see
  const visibleNav = filterNav(NAV_CONFIG, roleAccount);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <IconButton onClick={toggleSidebar} className="menu-button">
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
      <hr className="sidebar-divider" />

      <ul className="sidebar-menu">
        {visibleNav.map((item) => (
          <NavItem key={item.path ?? item.label} item={item} isOpen={isOpen} />
        ))}
      </ul>
    </div>
  );
}
