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

export default function Topbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
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

            {/* <MenuItem
              onClick={() => {
                handleMenuClose();
                // Add profile navigation if needed
              }}
              sx={{
                py: 1.5,
                "&:hover": {
                  backgroundColor: "rgba(46, 99, 133, 0.08)",
                },
              }}
            >
              <AccountCircleIcon sx={{ mr: 1.5, color: "#2e6385ff" }} />
              <Typography variant="body2">My Profile</Typography>
            </MenuItem> */}

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
