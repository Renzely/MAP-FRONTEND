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
} from "@mui/material";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 cards per page

  // ✅ Fetch recent activity from backend
  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get(
        "https://api-map.bmphrc.com/recent-activities"
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
    currentPage * itemsPerPage
  );

  return (
    <div className="recentActivity">
      <Topbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            backgroundColor: "#003554",
            minHeight: "100vh",
            color: "#fff",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Recent Employee Activity
          </Typography>

          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              p: 4,
              color: "#000",
              maxWidth: 1700,
              mx: "auto",
            }}
          >
            {loading ? (
              <Typography>Loading recent activities...</Typography>
            ) : activities.length === 0 ? (
              <Typography>No recent activities found.</Typography>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedActivities.map((activity) => (
                    <Grid item xs={12} md={6} lg={4} key={activity._id}>
                      <Card
                        sx={{
                          borderRadius: 2,
                          boxShadow: 3,
                          "&:hover": { boxShadow: 6 },
                        }}
                      >
                        <CardContent>
                          {/* Employee Name */}
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {activity.employeeName}
                          </Typography>

                          {/* Date */}
                          <Typography variant="body2" color="text.secondary">
                            {new Date(activity.date).toLocaleDateString()}
                            {", "}
                            {new Date(activity.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </Typography>

                          <Divider sx={{ my: 1.5 }} />

                          {/* Updated Fields */}
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              Updated Fields:
                            </Typography>

                            {Array.isArray(activity.changes) &&
                            activity.changes.filter(
                              (change) => change.field !== "updatedBy"
                            ).length > 0 ? (
                              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                                {activity.changes
                                  .filter(
                                    (change) => change.field !== "updatedBy"
                                  )
                                  .map((change, i) => (
                                    <li key={change._id?.$oid || i}>
                                      <Typography variant="body2">
                                        <strong>{change.field}</strong> from{" "}
                                        <span style={{ color: "#C62828" }}>
                                          "{change.oldValue}"
                                        </span>{" "}
                                        →{" "}
                                        <span style={{ color: "#2E7D32" }}>
                                          "{change.newValue}"
                                        </span>
                                      </Typography>
                                    </li>
                                  ))}
                              </ul>
                            ) : (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                No changes recorded.
                              </Typography>
                            )}
                          </Box>

                          {/* Updated By */}
                          <Typography
                            variant="body2"
                            sx={{ mt: 2, color: "#666" }}
                          >
                            Updated by:{" "}
                            <span style={{ fontWeight: 600, color: "#000" }}>
                              {activity.updatedBy || "Unknown Admin"}
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 3, justifyContent: "center" }}
                  >
                    <Button
                      variant="outlined"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </Button>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      Page {currentPage} of {totalPages}
                    </Typography>
                    <Button
                      variant="outlined"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </Button>
                  </Stack>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
