import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  Stack,
  Paper,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 6; // Show 6 cards per page

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

  // ✅ Fetch recent activity from backend
  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get(
        "https://api-map.bmphrc.com//recent-activities",
      );
      if (response.status === 200 && response.data.data) {
        setActivities(response.data.data);
      } else {
        console.error("Unexpected response format:", response.data);
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

  // Pagination logic
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
          paddingTop: "64px", // Account for fixed topbar
        }}
      >
        <Box
          sx={{
            p: 3,
            maxWidth: "1800px",
            margin: "0 auto",
          }}
        >
          {/* Header Section */}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  width: 56,
                  height: 56,
                }}
              >
                <HistoryIcon sx={{ fontSize: 32, color: "white" }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  Recent Employee Activity
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  Track all employee record updates and modifications
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Main Content */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              minHeight: "70vh",
            }}
          >
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
            ) : activities.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                }}
              >
                <HistoryIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: "#666" }}>
                  No Recent Activities Found
                </Typography>
                <Typography variant="body2" sx={{ color: "#999" }}>
                  Employee updates will appear here when changes are made.
                </Typography>
              </Box>
            ) : (
              <>
                {/* Activity Stats */}
                <Box sx={{ mb: 3 }}>
                  <Chip
                    icon={<UpdateIcon />}
                    label={`${activities.length} Total Activities`}
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      px: 1,
                    }}
                  />
                </Box>

                {/* Activity Cards Grid */}
                <Grid container spacing={3}>
                  {paginatedActivities.map((activity) => (
                    <Grid item xs={12} md={6} lg={4} key={activity._id}>
                      <Card
                        sx={{
                          borderRadius: "12px",
                          border: "1px solid #e0e0e0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          height: 380,
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
                              "linear-gradient(135deg, #f5f7fa 0%, #e8eef3 100%)",
                            p: 2,
                            borderBottom: "2px solid #2e6385ff",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "#2e6385ff",
                                fontSize: "14px",
                              }}
                            >
                              {activity.employeeName?.charAt(0).toUpperCase() ||
                                "E"}
                            </Avatar>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                fontSize: "16px",
                                color: "#2e6385ff",
                              }}
                            >
                              {activity.employeeName}
                            </Typography>
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
                          {/* Updated Fields */}
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              mb: 1.5,
                              color: "#2e6385ff",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <ArrowForwardIcon sx={{ fontSize: 16 }} />
                            Updated Fields (
                            {activity.changes?.filter(
                              (c) => c.field !== "updatedBy",
                            ).length || 0}
                            )
                          </Typography>

                          {/* Scrollable Changes List */}
                          <Box
                            sx={{
                              maxHeight: 180,
                              overflowY: "auto",
                              pr: 1,
                              "&::-webkit-scrollbar": {
                                width: "6px",
                              },
                              "&::-webkit-scrollbar-track": {
                                background: "#f1f1f1",
                                borderRadius: "10px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                background: "#888",
                                borderRadius: "10px",
                                "&:hover": {
                                  background: "#555",
                                },
                              },
                            }}
                          >
                            {Array.isArray(activity.changes) &&
                            activity.changes.filter(
                              (change) => change.field !== "updatedBy",
                            ).length > 0 ? (
                              <Stack spacing={1.5}>
                                {activity.changes
                                  .filter(
                                    (change) => change.field !== "updatedBy",
                                  )
                                  .map((change, i) => (
                                    <Box
                                      key={change._id?.$oid || i}
                                      sx={{
                                        p: 1.5,
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "8px",
                                        borderLeft: "3px solid #2e6385ff",
                                      }}
                                    >
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          fontWeight: 600,
                                          color: "#2e6385ff",
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
                                        <Chip
                                          label={change.oldValue || "Empty"}
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
                                          sx={{ fontSize: 14, color: "#999" }}
                                        />
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
                                  ))}
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
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 18, color: "#666" }} />
                          <Typography
                            variant="body2"
                            sx={{ color: "#666", fontSize: "13px" }}
                          >
                            Updated by:{" "}
                            <span
                              style={{ fontWeight: 600, color: "#2e6385ff" }}
                            >
                              {activity.updatedBy || "Unknown Admin"}
                            </span>
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <Box
                    sx={{
                      mt: 4,
                      pt: 3,
                      borderTop: "2px solid #e0e0e0",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="outlined"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        sx={{
                          borderColor: "#2e6385ff",
                          color: "#2e6385ff",
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: "8px",
                          px: 3,
                          "&:hover": {
                            backgroundColor: "rgba(46, 99, 133, 0.08)",
                            borderColor: "#0c2e3fff",
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
                          sx={{
                            fontWeight: 600,
                            color: "#2e6385ff",
                          }}
                        >
                          Page {currentPage} of {totalPages}
                        </Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        sx={{
                          borderColor: "#2e6385ff",
                          color: "#2e6385ff",
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: "8px",
                          px: 3,
                          "&:hover": {
                            backgroundColor: "rgba(46, 99, 133, 0.08)",
                            borderColor: "#0c2e3fff",
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
          </Paper>
        </Box>
      </Box>
    </>
  );
}
