import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Grid,
  Pagination,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  FormControlLabel,
  Switch,
  Paper,
  Avatar,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import dayjs from "dayjs";
import {
  Business,
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Language,
  Badge,
  AccountBalance,
} from "@mui/icons-material";
import PhotoIcon from "@mui/icons-material/Photo";
import SearchIcon from "@mui/icons-material/Search";

export default function ViewClientProfileEnhanced() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedRemarks, setSelectedRemarks] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openImages, setOpenImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [employeeCounts, setEmployeeCounts] = useState({});

  const cardsPerPage = 6;

  // Listen to sidebar state from localStorage
  useEffect(() => {
    const checkSidebarState = () => {
      const isOpen = localStorage.getItem("sidebarOpen") === "true";
      setSidebarOpen(isOpen);
    };

    checkSidebarState();
    window.addEventListener("storage", checkSidebarState);
    const interval = setInterval(checkSidebarState, 100);

    return () => {
      window.removeEventListener("storage", checkSidebarState);
      clearInterval(interval);
    };
  }, []);

  const handleOpenImages = (images) => {
    setSelectedImages(images || []);
    setOpenImages(true);
  };

  const handleCloseImages = () => {
    setOpenImages(false);
    setSelectedImages([]);
  };

  const isContractExpired = (contractED) => {
    if (!contractED) return false;
    return dayjs(contractED).isBefore(dayjs(), "day");
  };

  const isContractEndingThisMonth = (contractED) => {
    if (!contractED) return false;

    const today = dayjs();
    const endDate = dayjs(contractED);

    return endDate.isSame(today, "month") && endDate.isAfter(today, "day");
  };

  const isContractExpiringIn3Months = (contractED) => {
    if (!contractED) return false;

    const today = dayjs();
    const endDate = dayjs(contractED);

    return (
      endDate.isAfter(today, "day") &&
      endDate.isBefore(today.add(3, "month")) &&
      !endDate.isSame(today, "month")
    );
  };

  const getEmployeeCount = (client) => {
    const key = `${client.company}|${client.clientProfile}`;
    return employeeCounts[key] || 0;
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setCurrentPage(1);

    if (value === "") {
      setFilteredAccounts(
        selectedRemarks === "" || selectedRemarks === "UNFILTERED"
          ? accounts
          : accounts.filter(
              (acc) =>
                acc.remarks?.toLowerCase() === selectedRemarks.toLowerCase(),
            ),
      );
    } else {
      const baseAccounts =
        selectedRemarks === "" || selectedRemarks === "UNFILTERED"
          ? accounts
          : accounts.filter(
              (acc) =>
                acc.remarks?.toLowerCase() === selectedRemarks.toLowerCase(),
            );

      const searched = baseAccounts.filter(
        (acc) =>
          acc.clientProfile?.toLowerCase().includes(value.toLowerCase()) ||
          acc.company?.toLowerCase().includes(value.toLowerCase()) ||
          acc.firstName?.toLowerCase().includes(value.toLowerCase()) ||
          acc.lastName?.toLowerCase().includes(value.toLowerCase()) ||
          acc.email?.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredAccounts(searched);
    }
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setEditFormData({
      clientProfile: client.clientProfile || "",
      company: client.company || "",
      businessType: client.businessType || "",
      clientAddress: client.clientAddress || "",
      billingAddress: client.billingAddress || "",
      clientDepartment: client.clientDepartment || "",
      jobTitle: client.jobTitle || "",
      firstName: client.firstName || "",
      middleName: client.middleName || "",
      lastName: client.lastName || "",
      primaryContact: client.primaryContact || false,
      contact: client.contact || "",
      email: client.email || "",
      tin: client.tin || "",
      paymentTerm: client.paymentTerm || "",
      contractSD: client.contractSD
        ? dayjs(client.contractSD).format("YYYY-MM-DD")
        : "",
      contractED: client.contractED
        ? dayjs(client.contractED).format("YYYY-MM-DD")
        : "",
      clientWebsite: client.clientWebsite || "",
    });
    setIsEditMode(false);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setIsEditMode(false);
    setSelectedClient(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchEmployeeCounts = async () => {
    try {
      const response = await axios.get(
        "http://192.168.68.50:3001/get-employee-counts-by-client",
      );

      const countsMap = {};
      response.data.forEach((item) => {
        const key = `${item.company}|${item.clientAssigned}`;
        countsMap[key] = item.employeeCount;
      });

      setEmployeeCounts(countsMap);
    } catch (error) {
      console.error("Error fetching employee counts:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://192.168.68.50:3001/update-client-profile/${selectedClient._id}`,
        editFormData,
      );

      const updatedAccounts = accounts.map((acc) =>
        acc._id === selectedClient._id ? { ...acc, ...editFormData } : acc,
      );
      setAccounts(updatedAccounts);
      setFilteredAccounts(
        filteredAccounts.map((acc) =>
          acc._id === selectedClient._id ? { ...acc, ...editFormData } : acc,
        ),
      );

      alert("Client profile updated successfully!");
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating client profile:", error);
      alert("Failed to update client profile. Please try again.");
    }
  };

  const handleRemarksChange = (event) => {
    const value = event.target.value;
    setSelectedRemarks(value);
    setCurrentPage(1);

    if (value === "" || value === "UNFILTERED") {
      setFilteredAccounts(accounts);
    } else {
      const filtered = accounts.filter(
        (acc) => acc.company?.toLowerCase() === value.toLowerCase(),
      );
      setFilteredAccounts(filtered);
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.68.50:3001/get-client-profiles",
        );
        setAccounts(response.data);
        setFilteredAccounts(response.data);
      } catch (error) {
        console.error("Error fetching client profiles:", error);
      }
    };

    fetchAccounts();
    fetchEmployeeCounts();
  }, []);

  const totalPages = Math.ceil(filteredAccounts.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentAccounts = filteredAccounts.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                  <AccountBalance sx={{ fontSize: 32, color: "white" }} />
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
                    Client Profiles
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    View and manage client information
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={`Total: ${filteredAccounts.length} clients`}
                sx={{
                  backgroundColor: "white",
                  color: "#2e6385ff",
                  fontWeight: 600,
                  fontSize: "14px",
                  px: 2,
                }}
              />
            </Box>
          </Paper>

          {/* Filters Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: "1px solid #e0e0e0",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search clients by name, company, email..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ mr: 1, color: "#666" }} />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Filter by Company</InputLabel>
                  <Select
                    value={selectedRemarks}
                    onChange={handleRemarksChange}
                    label="Filter by Company"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="">
                      <em>All Companies</em>
                    </MenuItem>
                    <MenuItem value="UNFILTERED">All Companies</MenuItem>
                    <MenuItem value="BMPOWER HUMAN RESOURCES CORPORATION">
                      BMPOWER HUMAN RESOURCES CORPORATION
                    </MenuItem>
                    <MenuItem value="MARABOU EVERGREEN RESOURCES INC">
                      MARABOU EVERGREEN RESOURCES INC
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Cards Grid */}
          <Grid container spacing={3}>
            {currentAccounts.map((client, index) => (
              <Grid item xs={12} sm={6} md={4} key={client._id || index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#2e6385",
                          mb: 0.5,
                        }}
                      >
                        {client.clientProfile || "N/A"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Business sx={{ fontSize: 16 }} />
                        {client.company || "N/A"}
                      </Typography>

                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Person sx={{ fontSize: 16, color: "#2e6385" }} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#2e6385",
                            fontWeight: 600,
                          }}
                        >
                          {getEmployeeCount(client)} Active Employee
                          {getEmployeeCount(client) !== 1 ? "s" : ""}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Contact Person */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: "#333",
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Person sx={{ fontSize: 18 }} />
                        Contact Person
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555", pl: 3 }}>
                        {[client.firstName, client.middleName, client.lastName]
                          .filter(Boolean)
                          .join(" ") || "N/A"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#777", pl: 3 }}
                      >
                        {client.jobTitle || "N/A"}{" "}
                        {client.clientDepartment &&
                          `• ${client.clientDepartment}`}
                      </Typography>
                    </Box>

                    {/* Contact Info */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Email sx={{ fontSize: 16, color: "#666" }} />
                        <Typography
                          variant="body2"
                          sx={{ color: "#555", fontSize: "0.875rem" }}
                        >
                          {client.email || "N/A"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Phone sx={{ fontSize: 16, color: "#666" }} />
                        <Typography variant="body2" sx={{ color: "#555" }}>
                          {client.contact || "N/A"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOn sx={{ fontSize: 16, color: "#666" }} />
                        <Typography
                          variant="body2"
                          sx={{ color: "#555", fontSize: "0.875rem" }}
                        >
                          {client.clientAddress || "N/A"}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Additional Info */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "#777", display: "block", mb: 0.5 }}
                      >
                        <strong>Business Type:</strong>{" "}
                        {client.businessType || "N/A"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#777", display: "block", mb: 0.5 }}
                      >
                        <strong>Payment Term:</strong>{" "}
                        {client.paymentTerm || "N/A"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#777", display: "block", mb: 0.5 }}
                      >
                        <strong>TIN:</strong> {client.tin || "N/A"}
                      </Typography>
                      {client.contractSD && (
                        <Typography
                          variant="caption"
                          sx={{ color: "#777", display: "block" }}
                        >
                          <strong>Contract:</strong>{" "}
                          {dayjs(client.contractSD).format("DD-MMM-YYYY")} -{" "}
                          {client.contractED
                            ? dayjs(client.contractED).format("DD-MMM-YYYY")
                            : "Ongoing"}
                        </Typography>
                      )}
                    </Box>

                    {/* Footer */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {/* LEFT SIDE CHIPS */}
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip
                          label={
                            client.primaryContact ? "Primary" : "Secondary"
                          }
                          size="small"
                          color={client.primaryContact ? "primary" : "default"}
                          sx={{ fontSize: "0.75rem" }}
                        />

                        {isContractExpired(client.contractED) && (
                          <Tooltip
                            title={`Contract ended on ${dayjs(
                              client.contractED,
                            ).format("MMM DD, YYYY")}`}
                            arrow
                          >
                            <Chip
                              label="Expired"
                              size="small"
                              color="error"
                              sx={{ fontSize: "0.75rem", fontWeight: 500 }}
                            />
                          </Tooltip>
                        )}

                        {!isContractExpired(client.contractED) &&
                          isContractEndingThisMonth(client.contractED) && (
                            <Tooltip
                              title={`Contract ends on ${dayjs(
                                client.contractED,
                              ).format("MMM DD, YYYY")}`}
                              arrow
                            >
                              <Chip
                                label="Ending Soon"
                                size="small"
                                color="warning"
                                sx={{ fontSize: "0.75rem", fontWeight: 500 }}
                              />
                            </Tooltip>
                          )}

                        {!isContractExpired(client.contractED) &&
                          !isContractEndingThisMonth(client.contractED) &&
                          isContractExpiringIn3Months(client.contractED) && (
                            <Chip
                              label="Expiring"
                              size="small"
                              color="warning"
                              sx={{ fontSize: "0.75rem", fontWeight: 500 }}
                            />
                          )}
                      </Box>

                      {/* ACTION ICONS */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {client.requirementsImages?.length > 0 && (
                          <Tooltip title="View Contracts" arrow>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{
                                minWidth: 36,
                                padding: "4px",
                                borderColor: "#2e6385ff",
                                color: "#2e6385ff",
                                "&:hover": {
                                  borderColor: "#0c2e3fff",
                                  backgroundColor: "rgba(46, 99, 133, 0.08)",
                                },
                              }}
                              onClick={() =>
                                handleOpenImages(client.requirementsImages)
                              }
                            >
                              <PhotoIcon fontSize="small" />
                            </Button>
                          </Tooltip>
                        )}

                        {client.clientWebsite && (
                          <Tooltip title="Visit Website" arrow>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{
                                minWidth: 36,
                                padding: "4px",
                                borderColor: "#2e6385ff",
                                color: "#2e6385ff",
                                "&:hover": {
                                  borderColor: "#0c2e3fff",
                                  backgroundColor: "rgba(46, 99, 133, 0.08)",
                                },
                              }}
                              onClick={() =>
                                window.open(client.clientWebsite, "_blank")
                              }
                            >
                              <Language fontSize="small" />
                            </Button>
                          </Tooltip>
                        )}

                        <Tooltip title="Edit Client Profile" arrow>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{
                              minWidth: 36,
                              padding: "4px",
                              borderColor: "#2e6385ff",
                              color: "#2e6385ff",
                              "&:hover": {
                                borderColor: "#0c2e3fff",
                                backgroundColor: "rgba(46, 99, 133, 0.08)",
                              },
                            }}
                            onClick={() => handleEditClient(client)}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Edit Modal */}
          <Dialog
            open={openEditModal}
            onClose={handleCloseEditModal}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "12px",
              },
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#2e6385ff",
                color: "white",
                fontWeight: 600,
              }}
            >
              <Typography variant="h6">Client Profile</Typography>
              <Box>
                {!isEditMode ? (
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditMode(true)}
                    sx={{
                      mr: 1,
                      backgroundColor: "white",
                      color: "#2e6385ff",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveChanges}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CloseIcon />}
                      onClick={() => setIsEditMode(false)}
                      sx={{
                        borderColor: "white",
                        color: "white",
                        "&:hover": {
                          borderColor: "#f5f5f5",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {/* Company Information */}
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 2, color: "#2e6385" }}
                  >
                    Company Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Client Profile Name"
                    name="clientProfile"
                    value={editFormData.clientProfile || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    value={editFormData.company || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Type"
                    name="businessType"
                    value={editFormData.businessType || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="TIN Number"
                    name="tin"
                    value={editFormData.tin || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Client Address"
                    name="clientAddress"
                    value={editFormData.clientAddress || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    multiline
                    rows={2}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Billing Address"
                    name="billingAddress"
                    value={editFormData.billingAddress || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    multiline
                    rows={2}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    name="clientWebsite"
                    value={editFormData.clientWebsite || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                {/* Contact Person Information */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 2, color: "#2e6385" }}
                  >
                    Contact Person Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={editFormData.firstName || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    value={editFormData.middleName || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={editFormData.lastName || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    name="jobTitle"
                    value={editFormData.jobTitle || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="clientDepartment"
                    value={editFormData.clientDepartment || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={editFormData.email || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contact"
                    value={editFormData.contact || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editFormData.primaryContact || false}
                        onChange={handleInputChange}
                        name="primaryContact"
                        disabled={!isEditMode}
                      />
                    }
                    label="Primary Contact"
                  />
                </Grid>

                {/* Contract Information */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 2, color: "#2e6385" }}
                  >
                    Contract Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Payment Term"
                    name="paymentTerm"
                    value={editFormData.paymentTerm || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}></Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contract Start Date"
                    name="contractSD"
                    type="date"
                    value={editFormData.contractSD || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contract End Date"
                    name="contractED"
                    type="date"
                    value={editFormData.contractED || ""}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={handleCloseEditModal}
                variant="outlined"
                sx={{
                  borderColor: "#666",
                  color: "#666",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#333",
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Images Dialog */}
          <Dialog
            open={openImages}
            onClose={handleCloseImages}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "12px",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#2e6385ff",
                color: "white",
                fontWeight: 600,
              }}
            >
              Contract / Requirement Files
            </DialogTitle>

            <DialogContent dividers>
              {selectedImages.length === 0 ? (
                <Typography color="text.secondary">
                  No contract files uploaded.
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {selectedImages.map((img, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        component="img"
                        src={img}
                        alt={`Contract ${index + 1}`}
                        sx={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          borderRadius: 2,
                          cursor: "pointer",
                          boxShadow: 1,
                          "&:hover": {
                            opacity: 0.9,
                          },
                        }}
                        onClick={() => window.open(img, "_blank")}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={handleCloseImages}
                variant="outlined"
                sx={{
                  borderColor: "#666",
                  color: "#666",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#333",
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* No Results */}
          {filteredAccounts.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                backgroundColor: "white",
                borderRadius: 3,
                mt: 3,
              }}
            >
              <Typography variant="h6" sx={{ color: "#999" }}>
                No clients found
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {filteredAccounts.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "1rem",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
