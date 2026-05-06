import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
  Paper,
  Chip,
  Avatar,
  CircularProgress,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BadgeIcon from "@mui/icons-material/Badge";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const itemsPerPage = 6;

  // ── Role-based filtering ────────────────────────────────────────────────
  const currentRole = localStorage.getItem("roleAccount");
  const SPX_VIEWER_ROLES = [
    "SPX ACCOUNT SUPERVISOR",
    "SPX OPERATION HEAD & LOGISTICS",
  ];
  const SPX_ACTIVITY_ROLES = ["SPX COORDINATOR", "SPX HR SPECIALIST"];
  const isSPXViewer = SPX_VIEWER_ROLES.includes(currentRole);

  const visibleActivities = isSPXViewer
    ? activities.filter((a) => SPX_ACTIVITY_ROLES.includes(a.updatedByRole))
    : activities;

  // ── Split by type ────────────────────────────────────────────────────────
  const updates = visibleActivities.filter(
    (a) => a.activityType !== "NEW_EMPLOYEE",
  );
  const newRegistrations = visibleActivities.filter(
    (a) => a.activityType === "NEW_EMPLOYEE",
  );
  const displayList = activeTab === 0 ? updates : newRegistrations;

  const totalPages = Math.ceil(displayList.length / itemsPerPage);
  const paginated = displayList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const checkSidebarState = () => {
      setSidebarOpen(localStorage.getItem("sidebarOpen") === "true");
    };
    checkSidebarState();
    window.addEventListener("storage", checkSidebarState);
    const interval = setInterval(checkSidebarState, 100);
    return () => {
      window.removeEventListener("storage", checkSidebarState);
      clearInterval(interval);
    };
  }, []);

  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get(
        "https://api-map.bmphrc.com/recent-activities",
      );
      if (response.status === 200 && response.data.data) {
        setActivities(response.data.data);
      }
    } catch (error) {
      console.error("❌ Error fetching recent activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  // ── Export Summary to Excel ─────────────────────────────────────────────
  const exportSummary = () => {
    const XLSX = require("sheetjs-style");

    const roleCounts = {};
    visibleActivities.forEach((a) => {
      const role = a.updatedByRole || "Unknown";
      if (!roleCounts[role])
        roleCounts[role] = { role, updates: 0, newRegistrations: 0, total: 0 };
      if (a.activityType === "NEW_EMPLOYEE") {
        roleCounts[role].newRegistrations += 1;
      } else {
        roleCounts[role].updates += 1;
      }
      roleCounts[role].total += 1;
    });

    const summaryRows = Object.values(roleCounts).sort(
      (a, b) => b.total - a.total,
    );
    const wb = XLSX.utils.book_new();

    // ── Sheet 1: Summary by Role ──
    const summaryHeaders = [
      "Role",
      "Updates",
      "New Registrations",
      "Total Activities",
    ];
    const summaryData = summaryRows.map((r) => ({
      Role: r.role,
      Updates: r.updates,
      "New Registrations": r.newRegistrations,
      "Total Activities": r.total,
    }));
    const ws1 = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws1, [summaryHeaders], { origin: "A1" });
    XLSX.utils.sheet_add_json(ws1, summaryData, {
      origin: "A2",
      skipHeader: true,
      header: summaryHeaders,
    });
    ws1["!cols"] = summaryHeaders.map(() => ({ wch: 22 }));
    summaryHeaders.forEach((_, col) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: col });
      if (ws1[cell])
        ws1[cell].s = {
          font: { bold: true },
          alignment: { horizontal: "center" },
        };
    });
    XLSX.utils.book_append_sheet(wb, ws1, "Summary by Role");

    // ── Sheet 2: All Updates ──
    const updateHeaders = [
      "Employee Name",
      "Updated By",
      "Role",
      "Fields Changed",
      "Date & Time",
    ];
    const updateData = updates.map((a) => ({
      "Employee Name": a.employeeName,
      "Updated By": a.updatedBy,
      Role: a.updatedByRole || "—",
      "Fields Changed":
        a.changes
          ?.filter(
            (c) =>
              c.field !== "updatedBy" &&
              c.field !== "Outlet" &&
              c.field !== "Hub",
          )
          .map((c) => `${c.field}: ${c.oldValue} → ${c.newValue}`)
          .join(" | ") || "—",
      "Date & Time": new Date(a.date).toLocaleString("en-PH"),
    }));
    const ws2 = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws2, [updateHeaders], { origin: "A1" });
    XLSX.utils.sheet_add_json(ws2, updateData, {
      origin: "A2",
      skipHeader: true,
      header: updateHeaders,
    });
    ws2["!cols"] = [
      { wch: 25 },
      { wch: 25 },
      { wch: 30 },
      { wch: 60 },
      { wch: 22 },
    ];
    updateHeaders.forEach((_, col) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: col });
      if (ws2[cell])
        ws2[cell].s = {
          font: { bold: true },
          alignment: { horizontal: "center" },
        };
    });
    XLSX.utils.book_append_sheet(wb, ws2, "Updates");

    // ── Sheet 3: New Registrations ──
    const regHeaders = [
      "Employee Name",
      "Company",
      "Client Assigned",
      "Position",
      "Status",
      "Remarks",
      "Created By",
      "Role",
      "Date & Time",
    ];
    const regData = newRegistrations.map((a) => {
      const get = (field) =>
        a.changes?.find((c) => c.field === field)?.newValue || "—";
      return {
        "Employee Name": a.employeeName,
        Company: get("Company"),
        "Client Assigned": get("Client Assigned"),
        Position: get("Position"),
        Status: get("Status"),
        Remarks: get("Remarks"),
        "Created By": a.updatedBy,
        Role: a.updatedByRole || "—",
        "Date & Time": new Date(a.date).toLocaleString("en-PH"),
      };
    });
    const ws3 = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws3, [regHeaders], { origin: "A1" });
    XLSX.utils.sheet_add_json(ws3, regData, {
      origin: "A2",
      skipHeader: true,
      header: regHeaders,
    });
    ws3["!cols"] = regHeaders.map(() => ({ wch: 22 }));
    regHeaders.forEach((_, col) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: col });
      if (ws3[cell])
        ws3[cell].s = {
          font: { bold: true },
          alignment: { horizontal: "center" },
        };
    });
    XLSX.utils.book_append_sheet(wb, ws3, "New Registrations");

    const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Activity_Summary_${new Date().toISOString().split("T")[0]}.xlsx`;
    link.click();
  };

  const getFieldColor = (field) => {
    const deployFields = [
      "Deploy Status",
      "Deploy Date",
      "Undeploy Date",
      "Reliever Deploy Until",
      "Hub Assigned",
      "Region",
    ];
    const applicantFields = [
      "Applicant Status",
      "Back Out Reason",
      "Target Onboard Date",
    ];
    const employeeFields = [
      "Status",
      "Remarks",
      "Employee Status",
      "Outlet Removed",
      "Coordinator Assigned to Hub",
    ];
    if (deployFields.includes(field))
      return { border: "#2e7d32", bg: "#f0fdf4" };
    if (applicantFields.includes(field))
      return { border: "#1565c0", bg: "#f0f8ff" };
    if (employeeFields.includes(field))
      return { border: "#e65100", bg: "#fff8f0" };
    return { border: "#2e6385ff", bg: "#f8f9fa" };
  };

  return (
    <>
      <Topbar />
      <Sidebar />
      <Box
        sx={{
          marginLeft: { xs: 0, md: sidebarOpen ? "280px" : "70px" },
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          backgroundColor: "#f5f7fa",
          paddingTop: "64px",
        }}
      >
        <Box sx={{ p: 3, maxWidth: "1800px", margin: "0 auto" }}>
          {/* Header */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              background:
                "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 56,
                    height: 56,
                  }}
                >
                  <HistoryIcon sx={{ fontSize: 32, color: "white" }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: 700, mb: 0.5 }}
                  >
                    Recent Employee Activity
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {isSPXViewer
                      ? "SPX-related activity — updates and registrations"
                      : "Track all employee record updates and new registrations"}
                  </Typography>
                </Box>
              </Box>

              {/* Export Button — hidden for SPX viewers */}
              {!isSPXViewer && (
                <Button
                  variant="contained"
                  startIcon={<FileDownloadIcon />}
                  onClick={exportSummary}
                  disabled={visibleActivities.length === 0}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "white",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 3,
                    py: 1.2,
                    border: "1px solid rgba(255,255,255,0.3)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                    "&.Mui-disabled": {
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  Export Summary (Excel)
                </Button>
              )}
            </Box>
          </Paper>

          {/* Main Content */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              minHeight: "70vh",
              overflow: "hidden",
            }}
          >
            {/* Tabs */}
            <Box
              sx={{
                borderBottom: "2px solid #e0e0e0",
                backgroundColor: "#fafafa",
                px: 3,
                pt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={(e, v) => {
                    setActiveTab(v);
                    setCurrentPage(1);
                  }}
                  sx={{
                    "& .MuiTab-root": {
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "14px",
                      minHeight: 40,
                    },
                    "& .Mui-selected": { color: "#2e6385ff" },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#2e6385ff",
                      height: 3,
                      borderRadius: "3px 3px 0 0",
                    },
                  }}
                >
                  <Tab
                    icon={<UpdateIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        Updates
                        <Chip
                          label={updates.length}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "11px",
                            fontWeight: 700,
                            backgroundColor: "#e3f2fd",
                            color: "#1565c0",
                          }}
                        />
                      </Box>
                    }
                  />
                  <Tab
                    icon={<PersonAddIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        New Registrations
                        <Chip
                          label={newRegistrations.length}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "11px",
                            fontWeight: 700,
                            backgroundColor: "#e8f5e9",
                            color: "#2e7d32",
                          }}
                        />
                      </Box>
                    }
                  />
                </Tabs>
                <Chip
                  icon={<UpdateIcon />}
                  label={`${visibleActivities.length} Total Activities`}
                  color="primary"
                  sx={{ fontWeight: 600, px: 1 }}
                />
              </Box>
            </Box>

            <Box sx={{ p: 4 }}>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 8,
                  }}
                >
                  <CircularProgress sx={{ color: "#2e6385ff", mb: 2 }} />
                  <Typography variant="body1" sx={{ color: "#666" }}>
                    Loading recent activities...
                  </Typography>
                </Box>
              ) : displayList.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  {activeTab === 0 ? (
                    <UpdateIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
                  ) : (
                    <PersonAddIcon
                      sx={{ fontSize: 80, color: "#ccc", mb: 2 }}
                    />
                  )}
                  <Typography variant="h6" gutterBottom sx={{ color: "#666" }}>
                    No {activeTab === 0 ? "Updates" : "New Registrations"} Found
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    {activeTab === 0
                      ? "Employee updates will appear here."
                      : "New employee registrations will appear here."}
                  </Typography>
                </Box>
              ) : (
                <>
                  <Grid container spacing={3}>
                    {paginated.map((activity) => (
                      <Grid item xs={12} md={6} lg={4} key={activity._id}>
                        <Card
                          sx={{
                            borderRadius: "12px",
                            border:
                              activity.activityType === "NEW_EMPLOYEE"
                                ? "1px solid #c8e6c9"
                                : "1px solid #e0e0e0",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            height: 400,
                            display: "flex",
                            flexDirection: "column",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          {/* Card Header */}
                          <Box
                            sx={{
                              background:
                                activity.activityType === "NEW_EMPLOYEE"
                                  ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
                                  : "linear-gradient(135deg, #f5f7fa 0%, #e8eef3 100%)",
                              p: 2,
                              borderBottom:
                                activity.activityType === "NEW_EMPLOYEE"
                                  ? "2px solid #2e7d32"
                                  : "2px solid #2e6385ff",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor:
                                      activity.activityType === "NEW_EMPLOYEE"
                                        ? "#2e7d32"
                                        : "#2e6385ff",
                                    fontSize: "14px",
                                  }}
                                >
                                  {activity.activityType === "NEW_EMPLOYEE" ? (
                                    <PersonAddIcon sx={{ fontSize: 16 }} />
                                  ) : (
                                    activity.employeeName
                                      ?.charAt(0)
                                      .toUpperCase() || "E"
                                  )}
                                </Avatar>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: "15px",
                                    color:
                                      activity.activityType === "NEW_EMPLOYEE"
                                        ? "#2e7d32"
                                        : "#2e6385ff",
                                  }}
                                >
                                  {activity.employeeName}
                                </Typography>
                              </Box>
                              {activity.activityType === "NEW_EMPLOYEE" && (
                                <Chip
                                  label="NEW"
                                  size="small"
                                  sx={{
                                    height: 18,
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    backgroundColor: "#2e7d32",
                                    color: "white",
                                  }}
                                />
                              )}
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#666",
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <UpdateIcon sx={{ fontSize: 14 }} />
                              {new Date(activity.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                              {" • "}
                              {new Date(activity.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </Typography>
                          </Box>

                          {/* Card Body */}
                          <CardContent
                            sx={{ flexGrow: 1, overflow: "hidden", p: 2.5 }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                mb: 1.5,
                                color:
                                  activity.activityType === "NEW_EMPLOYEE"
                                    ? "#2e7d32"
                                    : "#2e6385ff",
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              {activity.activityType === "NEW_EMPLOYEE" ? (
                                <>
                                  <BadgeIcon sx={{ fontSize: 16 }} />{" "}
                                  Registration Details (
                                  {activity.changes?.length || 0})
                                </>
                              ) : (
                                <>
                                  <ArrowForwardIcon sx={{ fontSize: 16 }} />{" "}
                                  Updated Fields (
                                  {activity.changes?.filter(
                                    (c) => c.field !== "updatedBy",
                                  ).length || 0}
                                  )
                                </>
                              )}
                            </Typography>

                            <Box
                              sx={{
                                maxHeight: 185,
                                overflowY: "auto",
                                pr: 1,
                                "&::-webkit-scrollbar": { width: "6px" },
                                "&::-webkit-scrollbar-track": {
                                  background: "#f1f1f1",
                                  borderRadius: "10px",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                  background: "#888",
                                  borderRadius: "10px",
                                },
                              }}
                            >
                              {Array.isArray(activity.changes) &&
                              activity.changes.filter(
                                (c) => c.field !== "updatedBy",
                              ).length > 0 ? (
                                <Stack spacing={1.5}>
                                  {activity.changes
                                    .filter((c) => c.field !== "updatedBy")
                                    .map((change, i) => {
                                      const colors = getFieldColor(
                                        change.field,
                                      );
                                      return (
                                        <Box
                                          key={i}
                                          sx={{
                                            p: 1.5,
                                            backgroundColor: colors.bg,
                                            borderRadius: "8px",
                                            borderLeft: `3px solid ${colors.border}`,
                                          }}
                                        >
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              fontWeight: 600,
                                              color: colors.border,
                                              display: "block",
                                              mb: 0.5,
                                              textTransform: "uppercase",
                                              fontSize: "10px",
                                              letterSpacing: "0.5px",
                                            }}
                                          >
                                            {change.field}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 1,
                                              flexWrap: "wrap",
                                            }}
                                          >
                                            {activity.activityType !==
                                              "NEW_EMPLOYEE" && (
                                              <>
                                                <Chip
                                                  label={
                                                    change.oldValue || "Empty"
                                                  }
                                                  size="small"
                                                  sx={{
                                                    bgcolor: "#ffebee",
                                                    color: "#c62828",
                                                    fontWeight: 500,
                                                    fontSize: "11px",
                                                    height: "22px",
                                                  }}
                                                />
                                                <ArrowForwardIcon
                                                  sx={{
                                                    fontSize: 14,
                                                    color: "#999",
                                                  }}
                                                />
                                              </>
                                            )}
                                            <Chip
                                              label={change.newValue || "Empty"}
                                              size="small"
                                              sx={{
                                                bgcolor: "#e8f5e9",
                                                color: "#2e7d32",
                                                fontWeight: 500,
                                                fontSize: "11px",
                                                height: "22px",
                                              }}
                                            />
                                          </Box>
                                        </Box>
                                      );
                                    })}
                                </Stack>
                              ) : (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#999",
                                    textAlign: "center",
                                    py: 2,
                                  }}
                                >
                                  No changes recorded.
                                </Typography>
                              )}
                            </Box>
                          </CardContent>

                          {/* Card Footer */}
                          <Box
                            sx={{
                              p: 2,
                              borderTop: "1px solid #e0e0e0",
                              backgroundColor: "#fafafa",
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexWrap: "wrap",
                            }}
                          >
                            <PersonIcon sx={{ fontSize: 18, color: "#666" }} />
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ color: "#666", fontSize: "13px" }}
                              >
                                {activity.activityType === "NEW_EMPLOYEE"
                                  ? "Created by: "
                                  : "Updated by: "}
                                <span
                                  style={{
                                    fontWeight: 600,
                                    color: "#2e6385ff",
                                  }}
                                >
                                  {activity.updatedBy || "Unknown"}
                                </span>
                              </Typography>
                              {activity.updatedByRole && (
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#888", fontSize: "11px" }}
                                >
                                  Role:{" "}
                                  <span
                                    style={{ fontWeight: 600, color: "#555" }}
                                  >
                                    {activity.updatedByRole}
                                  </span>
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: "2px solid #e0e0e0" }}>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: "center", alignItems: "center" }}
                      >
                        <Button
                          variant="outlined"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => p - 1)}
                          sx={{
                            borderColor: "#2e6385ff",
                            color: "#2e6385ff",
                            fontWeight: 600,
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            "&:hover": {
                              backgroundColor: "rgba(46,99,133,0.08)",
                            },
                            "&:disabled": {
                              borderColor: "#e0e0e0",
                              color: "#999",
                            },
                          }}
                        >
                          Previous
                        </Button>
                        <Box
                          sx={{
                            px: 3,
                            py: 1,
                            borderRadius: "8px",
                            backgroundColor: "#f5f7fa",
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#2e6385ff" }}
                          >
                            Page {currentPage} of {totalPages}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage((p) => p + 1)}
                          sx={{
                            borderColor: "#2e6385ff",
                            color: "#2e6385ff",
                            fontWeight: 600,
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            "&:hover": {
                              backgroundColor: "rgba(46,99,133,0.08)",
                            },
                            "&:disabled": {
                              borderColor: "#e0e0e0",
                              color: "#999",
                            },
                          }}
                        >
                          Next
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
