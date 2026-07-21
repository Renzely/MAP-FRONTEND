import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import "./topbar.css";
import { useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSnackbar } from "notistack";
import { Badge, List, ListItem, ListItemText, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Topbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateResignedError, setDateResignedError] = useState(false);

  const role = localStorage.getItem("roleAccount");

  const allowedRoles = [
    "HR HEAD",
    "HR SPECIALIST",
    "HR COMPENSATION AND BENEFITS",
    "HR COORDINATOR SPECIALIST",
    "MIS",
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [notifs, setNotifs] = useState([]);
  const [unread, setUnread] = useState(0);
  const [bellAnchor, setBellAnchor] = useState(null);
  const socketRef = useRef(null);

  const canEdit = allowedRoles.includes(role);
  const [anchorEl, setAnchorEl] = useState(null);

  const fullName = localStorage.getItem("adminFullName");
  const roleAccount = localStorage.getItem("roleAccount");

  // Listen to sidebar state from localStorage
  useEffect(() => {
    const checkSidebarState = () => {
      const isOpen = localStorage.getItem("sidebarOpen") === "true";
      setSidebarOpen(isOpen);
    };

    checkSidebarState();

    // Listen for storage changes
    window.addEventListener("storage", checkSidebarState);

    // Poll for changes (since localStorage doesn't trigger storage event in same window)
    const interval = setInterval(checkSidebarState, 100);

    return () => {
      window.removeEventListener("storage", checkSidebarState);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!role) return;
    axios
      .get("https://api-map.bmphrc.com/notifications", { params: { role } })
      .then((r) => {
        const items = r.data.data || [];
        setNotifs(items);
        setUnread(
          items.filter((n) => !(n.readBy || []).includes(fullName)).length,
        );
      })
      .catch(() => {});
  }, [role, fullName]);

  // live channel
  useEffect(() => {
    if (!role) return;
    const socket = io("https://api-map.bmphrc.com", {
      auth: { role, fullName },
    });
    socketRef.current = socket;
    socket.on("notification", (n) => {
      console.log("🔔 notification received:", n);
      if (n.updatedBy === fullName) return; // don't ping myself for my own action
      setNotifs((prev) => [n, ...prev]);
      setUnread((u) => u + 1);
      enqueueSnackbar(n.message, { variant: "info", autoHideDuration: 5000 });
    });
    return () => socket.disconnect();
  }, [role, fullName, enqueueSnackbar]);

  const openBell = (e) => {
    setBellAnchor(e.currentTarget);
    if (unread > 0) {
      axios
        .post("https://api-map.bmphrc.com/notifications/mark-read", {
          user: fullName,
          role,
        })
        .catch(() => {});
      setUnread(0);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#0f2a44",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 1200,
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section - Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              color: "white",
              fontSize: { xs: "18px", sm: "22px", md: "26px" },
              letterSpacing: "0.5px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            NEXUS DESK
          </Typography>
        </Box>

        {/* Right Section - User Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* User Name (Hidden on mobile) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: 1.2,
              }}
            >
              {fullName || "Admin User"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "12px",
              }}
            >
              {roleAccount || "Administrator"}
            </Typography>
          </Box>

          <IconButton onClick={openBell} sx={{ color: "white" }}>
            <Badge badgeContent={unread} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={bellAnchor}
            open={Boolean(bellAnchor)}
            onClose={() => setBellAnchor(null)}
            PaperProps={{ sx: { mt: 1.5, width: 340, maxHeight: 420 } }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {notifs.map((n, i) => (
              <Box key={n._id || i}>
                <ListItem sx={{ py: 1, display: "block" }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                    {n.message}
                  </Typography>

                  {(n.changes || [])
                    .filter(
                      (c) => c.field !== "Outlet" && c.field !== "updatedBy",
                    )
                    .map((c, j) => (
                      <Typography
                        key={j}
                        sx={{ fontSize: 12, color: "#555", mt: 0.3 }}
                      >
                        {n.activityType === "NEW_EMPLOYEE"
                          ? `${c.field}: ${c.newValue}`
                          : `${c.field}: ${c.oldValue} → ${c.newValue}`}
                      </Typography>
                    ))}

                  <Typography sx={{ fontSize: 11, color: "#999", mt: 0.5 }}>
                    {new Date(n.date).toLocaleString("en-PH")}
                  </Typography>
                </ListItem>
                {i < notifs.length - 1 && <Divider />}
              </Box>
            ))}
          </Menu>

          {/* User Avatar with Dropdown */}
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              p: 0.5,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#90e0ef",
                color: "#0f2a44",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              {fullName ? fullName.charAt(0).toUpperCase() : "A"}
            </Avatar>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "8px",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* Mobile: Show user info in dropdown */}
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                px: 2,
                py: 1.5,
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "#0f2a44",
                  fontSize: "14px",
                }}
              >
                {fullName || "Admin User"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: "12px",
                }}
              >
                {roleAccount || "Administrator"}
              </Typography>
            </Box>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                handleLogout();
              }}
              sx={{
                py: 1.5,
                color: "#d32f2f",
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.08)",
                },
              }}
            >
              <LogoutIcon sx={{ mr: 1.5 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
