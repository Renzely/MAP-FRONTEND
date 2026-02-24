import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Modal,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Avatar,
  Fade,
  Backdrop,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import ImageIcon from "@mui/icons-material/Image";

import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import dayjs from "dayjs";

import mckenzielogo from "../../Images/Bmpower_Logo/BMP - MCKENZIE.png";

export default function BmpowerHO() {
  const XLSX = require("sheetjs-style");
  const [accounts, setAccounts] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = React.useState("");
  const [filteredAccounts, setFilteredAccounts] = React.useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [viewAllModalOpen, setViewAllModalOpen] = useState(false);
  const [viewRequirements, setViewRequirements] = useState([]);
  const [newUploads, setNewUploads] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  function CustomToolbar() {
    return (
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <GridToolbarQuickFilter
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#d0d0d0",
              },
              "&:hover fieldset": {
                borderColor: "#2e6385ff",
              },
            },
          }}
        />
      </Box>
    );
  }

  const fetchSavedRequirements = async (employeeEmail) => {
    try {
      const response = await axios.get(
        "https://api-map.bmphrc.com//get-merch-accounts",
      );

      const employee = response.data.find((emp) => emp._id === employeeEmail);

      if (employee && employee.requirementsImages) {
        setViewRequirements(employee.requirementsImages);
      } else {
        setViewRequirements([]);
      }
    } catch (err) {
      console.error("Failed to fetch saved requirements:", err);
      setViewRequirements([]);
    }
  };

  const handleRemarksChange = (event) => {
    const value = event.target.value;
    setSelectedRemarks(value);

    if (value === "" || value === "UNFILTERED") {
      setFilteredAccounts(accounts);
    } else {
      const filtered = accounts.filter(
        (acc) => acc.remarks?.toLowerCase() === value.toLowerCase(),
      );
      setFilteredAccounts(filtered);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setNewUploads([]);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedEmployee(null);
    setIsEditing(false);
    setNewUploads([]);
  };

  const handleSaveChanges = async (updatedEmployee) => {
    // 🔹 DIGIT VALIDATION FIRST
    if (updatedEmployee.sss && updatedEmployee.sss.length !== 10) {
      alert("SSS must be exactly 10 digits.");
      return;
    }

    if (
      updatedEmployee.philhealth &&
      updatedEmployee.philhealth.length !== 12
    ) {
      alert("PhilHealth must be exactly 12 digits.");
      return;
    }

    if (updatedEmployee.hdmf && updatedEmployee.hdmf.length !== 12) {
      alert("HDMF must be exactly 12 digits.");
      return;
    }

    if (updatedEmployee.tin && updatedEmployee.tin.length !== 12) {
      alert("TIN must be exactly 12 digits.");
      return;
    }

    try {
      const adminFullName = localStorage.getItem("adminFullName");

      const payload = {
        ...updatedEmployee,
        updatedBy: adminFullName || "Unknown",
      };

      console.log("✅ Sending update with admin:", payload.updatedBy);

      await axios.put(
        `https://api-map.bmphrc.com//update-employee/${updatedEmployee._id}`,
        payload,
      );

      alert("Employee details updated successfully!");
      setOpenEditModal(false);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee details.");
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "https://api-map.bmphrc.com//get-merch-accounts",
        );

        const bmpowerAccounts = response.data.filter(
          (acc) =>
            acc.company?.toUpperCase() ===
              "BMPOWER HUMAN RESOURCES CORPORATION" &&
            acc.clientAssigned?.toUpperCase() === "MCKENZIE DISTRIBUTION CO.",
        );

        setAccounts(bmpowerAccounts);
        setFilteredAccounts(bmpowerAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const getExportData = async () => {
    try {
      const response = await axios.post(
        "https://api-map.bmphrc.com//export-merch-accounts",
        {
          remarks: selectedRemarks,
          clientAssigned: "MCKENZIE DISTRIBUTION CO.",
        },
      );

      const headers = [
        // "#",
        "Company",
        "Client",
        "EmployeeNo",
        "Fullname",
        "Status",
        "Remarks",
        "Position",
        "Contact",
        "Email",
        "Birthday",
        "DateHired",
        "DateResigned",
        "HomeAddress",
        "ModeOfDisbursement",
        "AccountNumber",
        "SSS",
        "PhilHealth",
        "HDMF",
        "Tin",
      ];

      const newData = response.data.data;

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);

      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
      XLSX.utils.sheet_add_json(ws, newData, {
        origin: "A2",
        skipHeader: true,
        header: headers,
      });

      ws["!cols"] = headers.map((h) => ({
        wch:
          Math.max(
            h.length,
            ...newData.map((row) => (row[h] || "").toString().length),
          ) + 4,
      }));

      headers.forEach((_, col) => {
        const cell = XLSX.utils.encode_cell({ r: 0, c: col });
        if (ws[cell])
          ws[cell].s = {
            font: { bold: true },
            alignment: { horizontal: "center", vertical: "center" },
          };
      });

      XLSX.utils.book_append_sheet(wb, ws, "Employees");

      const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      alert(`Successfully exported ${newData.length} records!`);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `MASTERLIST_MCKENZIE_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Export failed. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };

  const getRemarksColor = (remarks) => {
    switch (remarks?.toLowerCase()) {
      case "employed":
        return "success";
      case "applicant":
        return "info";
      case "resign":
        return "warning";
      case "terminate":
        return "error";
      case "end of contract":
        return "default";
      default:
        return "default";
    }
  };

  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "middleName", headerName: "Middle Name", width: 150 },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 120,
      valueGetter: (value, row) => {
        const raw = row?.birthday;
        const dateValue =
          typeof raw === "object" && raw?.$date
            ? raw.$date
            : typeof raw === "string"
              ? raw
              : null;
        return dateValue;
      },
      valueFormatter: (value) => {
        if (!value) return "";
        return dayjs(value).format("DD-MMM-YY");
      },
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   width: 80,
    //   headerAlign: "center",
    //   align: "center",
    // },
    { field: "sss", headerName: "SSS No.", width: 150 },
    { field: "philhealth", headerName: "PHIC No.", width: 150 },
    { field: "hdmf", headerName: "HDMF No.", width: 150 },
    { field: "tin", headerName: "TIN No.", width: 150 },
    // { field: "company", headerName: "Company", width: 350 },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value || "N/A"}
          color={getRemarksColor(params.value)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value || "N/A"}
          color={getStatusColor(params.value)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Tooltip title="Edit Employee">
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(46, 99, 133, 0.1)",
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    // { field: "employeeNo", headerName: "Employee No.", width: 120 },
    // {
    //   field: "modeOfDisbursement",
    //   headerName: "Mode of Disbursement",
    //   width: 200,
    // },
    // { field: "accountNumber", headerName: "Account Number", width: 200 },
    // { field: "contact", headerName: "Contact", width: 130 },
    // { field: "email", headerName: "Email", width: 200 },
    // { field: "position", headerName: "Position", width: 150 },
    // {
    //   field: "dateHired",
    //   headerName: "Date Hired",
    //   width: 120,
    //   valueGetter: (value, row) => {
    //     const raw = row?.dateHired;
    //     const dateValue =
    //       typeof raw === "object" && raw?.$date
    //         ? raw.$date
    //         : typeof raw === "string"
    //           ? raw
    //           : null;
    //     return dateValue;
    //   },
    //   valueFormatter: (value) => {
    //     if (!value) return "";
    //     return dayjs(value).format("DD-MMM-YY");
    //   },
    // },
    // {
    //   field: "dateResigned",
    //   headerName: "Date Resigned",
    //   width: 120,
    //   valueGetter: (value, row) => {
    //     const raw = row?.dateResigned;
    //     const dateValue =
    //       typeof raw === "object" && raw?.$date
    //         ? raw.$date
    //         : typeof raw === "string"
    //           ? raw
    //           : null;
    //     return dateValue;
    //   },
    //   valueFormatter: (value) => {
    //     if (!value) return "";
    //     return dayjs(value).format("DD-MMM-YY");
    //   },
    // },
    // { field: "homeAddress", headerName: "Home Address", width: 250 },
    // {
    //   field: "silBalance",
    //   headerName: "SIL Balance",
    //   width: 120,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // { field: "clientAssigned", headerName: "Client Assigned", width: 200 },
  ];

  const rows = filteredAccounts.map((acc, index) => ({
    id: acc._id || index,
    count: index + 1,
    ...acc,
  }));

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
                src={mckenzielogo}
                alt="Mckenzie Logo"
                sx={{
                  width: 86,
                  height: 86,
                  "& img": {
                    objectFit: "contain", // or "contain"
                  },
                }}
              >
                <BusinessIcon sx={{ fontSize: 32, color: "white" }} />
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
                  Employee Management
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  MCKENZIE DISTRIBUTION CO.
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Filter and Export Section */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              mb: 3,
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                gap: 2,
              }}
            >
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel>Filter by Remarks</InputLabel>
                <Select
                  value={selectedRemarks}
                  onChange={handleRemarksChange}
                  label="Filter by Remarks"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                >
                  <MenuItem value="">
                    <em>Select Remarks</em>
                  </MenuItem>
                  <MenuItem value="UNFILTERED">All Records</MenuItem>
                  <MenuItem value="Applicant">Applicant</MenuItem>
                  <MenuItem value="Employed">Employed</MenuItem>
                  <MenuItem value="Resign">Resign</MenuItem>
                  <MenuItem value="Terminate">Terminate</MenuItem>
                  <MenuItem value="End of Contract">End of Contract</MenuItem>
                </Select>
              </FormControl>

              <Button
                onClick={getExportData}
                variant="contained"
                startIcon={<FileDownloadIcon />}
                sx={{
                  backgroundColor: "#2e6385ff",
                  color: "#fff",
                  height: "56px",
                  px: 4,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(46, 99, 133, 0.3)",
                  "&:hover": {
                    backgroundColor: "#0c2e3fff",
                    boxShadow: "0 6px 16px rgba(46, 99, 133, 0.4)",
                  },
                }}
              >
                Export to Excel
              </Button>

              <Box sx={{ flexGrow: 1 }} />

              <Chip
                icon={<PersonIcon />}
                label={`Total Employees: ${filteredAccounts.length}`}
                color="primary"
                sx={{
                  height: "40px",
                  fontSize: "15px",
                  fontWeight: 600,
                  px: 1,
                }}
              />
            </Box>
          </Paper>

          {/* DataGrid Section */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#fafafa",
                borderBottom: "2px solid #e0e0e0",
                fontSize: "14px",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f8f9fa",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight // This makes the grid expand to fit all rows
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              slots={{ toolbar: CustomToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              pageSizeOptions={[5, 10, 20, 50]}
              disableRowSelectionOnClick
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
            />
          </Paper>
          {/* Edit Employee Modal */}
          <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
          >
            <Fade in={openEditModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "95%", sm: "85%", md: "70%", lg: "60%" },
                  maxHeight: "90vh",
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  borderRadius: "16px",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                  "&::-webkit-scrollbar": {
                    width: "8px",
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
                {/* Modal Header */}
                <Box
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    background:
                      "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
                    p: 3,
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <BadgeIcon sx={{ color: "white" }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: 700 }}
                      >
                        Employee Details
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
                        {isEditing ? "Edit Mode" : "View Mode"}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={handleCloseEditModal}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Modal Body */}
                {selectedEmployee && (
                  <Box sx={{ p: 4 }}>
                    {/* Personal Information Section */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: "#2e6385ff",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <PersonIcon /> Personal Information
                        </Typography>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="First Name"
                              fullWidth
                              value={selectedEmployee.firstName || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  firstName: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="Middle Name"
                              fullWidth
                              value={selectedEmployee.middleName || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  middleName: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="Last Name"
                              fullWidth
                              value={selectedEmployee.lastName || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  lastName: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Birthday"
                              fullWidth
                              type="date"
                              value={
                                selectedEmployee.birthday
                                  ? dayjs(selectedEmployee.birthday).format(
                                      "YYYY-MM-DD",
                                    )
                                  : ""
                              }
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  birthday: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Age"
                              fullWidth
                              value={selectedEmployee.age || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  age: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Contact Number"
                              fullWidth
                              value={selectedEmployee.contact || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  contact: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Email"
                              fullWidth
                              value={selectedEmployee.email || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  email: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Home Address"
                              fullWidth
                              multiline
                              rows={2}
                              value={selectedEmployee.homeAddress || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  homeAddress: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Employment Information Section */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: "#2e6385ff",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <BusinessIcon /> Employment Information
                        </Typography>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl fullWidth>
                                <InputLabel>Company</InputLabel>
                                <Select
                                  value={selectedEmployee.company || ""}
                                  label="Company"
                                  onChange={(e) =>
                                    setSelectedEmployee({
                                      ...selectedEmployee,
                                      company: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="MARABOU EVERGREEN RESOURCES INC">
                                    MARABOU EVERGREEN RESOURCES INC
                                  </MenuItem>
                                  <MenuItem value="BMPOWER HUMAN RESOURCES CORPORATION">
                                    BMPOWER HUMAN RESOURCES CORPORATION
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                label="Company"
                                fullWidth
                                value={selectedEmployee.company || ""}
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Employee No."
                              fullWidth
                              value={selectedEmployee.employeeNo || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  employeeNo: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                  value={selectedEmployee.status || ""}
                                  label="Status"
                                  onChange={(e) =>
                                    setSelectedEmployee({
                                      ...selectedEmployee,
                                      status: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="Active">Active</MenuItem>
                                  <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                label="Status"
                                fullWidth
                                value={selectedEmployee.status || ""}
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl fullWidth>
                                <InputLabel>Remarks</InputLabel>
                                <Select
                                  value={selectedEmployee.remarks || ""}
                                  label="Remarks"
                                  onChange={(e) =>
                                    setSelectedEmployee({
                                      ...selectedEmployee,
                                      remarks: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="Applicant">
                                    Applicant
                                  </MenuItem>
                                  <MenuItem value="Employed">Employed</MenuItem>
                                  <MenuItem value="Resign">Resign</MenuItem>
                                  <MenuItem value="Terminate">
                                    Terminate
                                  </MenuItem>
                                  <MenuItem value="End of Contract">
                                    End of Contract
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                label="Remarks"
                                fullWidth
                                value={selectedEmployee.remarks || ""}
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Position"
                              fullWidth
                              value={selectedEmployee.position || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  position: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl fullWidth>
                                <InputLabel>Client Assigned</InputLabel>
                                <Select
                                  value={selectedEmployee.clientAssigned || ""}
                                  label="Client Assigned"
                                  onChange={(e) =>
                                    setSelectedEmployee({
                                      ...selectedEmployee,
                                      clientAssigned: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="ASIAN STREAK BROKERAGE CO">
                                    ASIAN STREAK BROKERAGE CO
                                  </MenuItem>
                                  <MenuItem value="BMPOWER HUMAN RESOURCES CORPORATION">
                                    BMPOWER HUMAN RESOURCES CORPORATION
                                  </MenuItem>
                                  <MenuItem value="CARMENS BEST">
                                    CARMENS BEST
                                  </MenuItem>
                                  <MenuItem value="ECOSSENTIAL FOODS CORP">
                                    ECOSSENTIAL FOODS CORP
                                  </MenuItem>
                                  <MenuItem value="ECOSSENTIAL FOODS CORP-HEAD OFFICE">
                                    ECOSSENTIAL FOODS CORP-HEAD OFFICE
                                  </MenuItem>
                                  <MenuItem value="ENGKANTO">ENGKANTO</MenuItem>
                                  <MenuItem value="J-GYU INC">
                                    J-GYU INC
                                  </MenuItem>
                                  <MenuItem value="LONG TABLE GROUP INC.- MASAJIRO">
                                    LONG TABLE GROUP INC. - MASAJIRO
                                  </MenuItem>
                                  <MenuItem value="MAGIS DISTRIBUTION INC.">
                                    MAGIS DISTRIBUTION INC.
                                  </MenuItem>
                                  <MenuItem value="MARABOU EVERGREEN RESOURCES INC">
                                    MARABOU EVERGREEN RESOURCES INC
                                  </MenuItem>
                                  <MenuItem value="MCKENZIE DISTRIBUTION CO.">
                                    MCKENZIE DISTRIBUTION CO.
                                  </MenuItem>
                                  <MenuItem value="METRO PACIFIC DAIRY FARM">
                                    METRO PACIFIC DAIRY FARM
                                  </MenuItem>
                                  <MenuItem value="METRO PACIFIC FRESH FARM">
                                    METRO PACIFIC FRESH FARM
                                  </MenuItem>
                                  <MenuItem value="PLDT TELESCOOP">
                                    PLDT TELESCOOP
                                  </MenuItem>
                                  <MenuItem value="RC">RC SALES AGENT</MenuItem>
                                  <MenuItem value="MANDOM">MANDOM</MenuItem>
                                  <MenuItem value="DEL MONTE">
                                    DEL MONTE
                                  </MenuItem>
                                  <MenuItem value="SPX EXPRESS">
                                    SPX EXPRESS
                                  </MenuItem>
                                  <MenuItem value="UNIVERSAL HARVESTER DAIRY FARM INC">
                                    UNIVERSAL HARVESTER DAIRY FARM INC
                                  </MenuItem>
                                  <MenuItem value="UNION GALVASTEEL CO.">
                                    UNION GALVASTEEL CO.
                                  </MenuItem>
                                  <MenuItem value="COSMETIQUE ASIA">
                                    COSMETIQUE ASIA
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                label="Client Assigned"
                                fullWidth
                                value={selectedEmployee.clientAssigned || ""}
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="Date Hired"
                              fullWidth
                              type="date"
                              value={
                                selectedEmployee.dateHired
                                  ? dayjs(selectedEmployee.dateHired).format(
                                      "YYYY-MM-DD",
                                    )
                                  : ""
                              }
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  dateHired: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="Date Resigned"
                              fullWidth
                              type="date"
                              value={
                                selectedEmployee.dateResigned
                                  ? dayjs(selectedEmployee.dateResigned).format(
                                      "YYYY-MM-DD",
                                    )
                                  : ""
                              }
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  dateResigned: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="SIL Balance"
                              fullWidth
                              value={selectedEmployee.silBalance || ""}
                              onChange={(e) =>
                                setSelectedEmployee({
                                  ...selectedEmployee,
                                  silBalance: e.target.value,
                                })
                              }
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Government IDs Section */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: "#2e6385ff",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <BadgeIcon /> Government IDs
                        </Typography>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="SSS No."
                              fullWidth
                              value={selectedEmployee.sss || ""}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                                if (value.length <= 10) {
                                  setSelectedEmployee({
                                    ...selectedEmployee,
                                    sss: value,
                                  });
                                }
                              }}
                              inputProps={{ maxLength: 10 }}
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="PHIC No."
                              fullWidth
                              value={selectedEmployee.philhealth || ""}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 12) {
                                  setSelectedEmployee({
                                    ...selectedEmployee,
                                    philhealth: value,
                                  });
                                }
                              }}
                              inputProps={{ maxLength: 12 }}
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="HDMF No."
                              fullWidth
                              value={selectedEmployee.hdmf || ""}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 12) {
                                  setSelectedEmployee({
                                    ...selectedEmployee,
                                    hdmf: value,
                                  });
                                }
                              }}
                              inputProps={{ maxLength: 12 }}
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="TIN No."
                              fullWidth
                              value={selectedEmployee.tin || ""}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 12) {
                                  setSelectedEmployee({
                                    ...selectedEmployee,
                                    tin: value,
                                  });
                                }
                              }}
                              inputProps={{ maxLength: 12 }}
                              InputProps={{ readOnly: !isEditing }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Banking Information Section */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: "#2e6385ff",
                          }}
                        >
                          Banking Information
                        </Typography>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl fullWidth>
                                <InputLabel>Mode of Disbursement</InputLabel>
                                <Select
                                  value={
                                    selectedEmployee.modeOfDisbursement || ""
                                  }
                                  label="Mode of Disbursement"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedEmployee({
                                      ...selectedEmployee,
                                      modeOfDisbursement: value,
                                      accountNumber: "",
                                    });
                                  }}
                                >
                                  <MenuItem value="AUB (Hello Money)">
                                    AUB (Hello Money)
                                  </MenuItem>
                                  <MenuItem value="BDO NETWORK">
                                    BDO NETWORK
                                  </MenuItem>
                                  <MenuItem value="BDO UNIBANK">
                                    BDO UNIBANK
                                  </MenuItem>
                                  <MenuItem value="BPI">BPI</MenuItem>
                                  <MenuItem value="CEBUANA">CEBUANA</MenuItem>
                                  <MenuItem value="CHINABANK">
                                    CHINABANK
                                  </MenuItem>
                                  <MenuItem value="EASTWEST">EASTWEST</MenuItem>
                                  <MenuItem value="GCASH">GCASH</MenuItem>
                                  <MenuItem value="LANDBANK">LANDBANK</MenuItem>
                                  <MenuItem value="METROBANK">
                                    METROBANK
                                  </MenuItem>
                                  <MenuItem value="PNB">PNB</MenuItem>
                                  <MenuItem value="RCBC">RCBC</MenuItem>
                                  <MenuItem value="SECURITY BANK">
                                    SECURITY BANK
                                  </MenuItem>
                                  <MenuItem value="UNIONBANK">
                                    UNIONBANK
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                label="Mode of Disbursement"
                                fullWidth
                                value={
                                  selectedEmployee.modeOfDisbursement || ""
                                }
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Account Number"
                              fullWidth
                              value={selectedEmployee.accountNumber || ""}
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  "",
                                );
                                const maxLengths = {
                                  GCASH: 11,
                                  CEBUANA: 11,
                                  PNB: 12,
                                  RCBC: 10,
                                  EASTWEST: 12,
                                  "AUB (Hello Money)": 12,
                                  LANDBANK: 10,
                                  UNIONBANK: 12,
                                  "BDO NETWORK": 12,
                                  "BDO UNIBANK": 12,
                                  BPI: 12,
                                  "SECURITY BANK": 13,
                                  METROBANK: 13,
                                  CHINABANK: 12,
                                };
                                const maxLength =
                                  maxLengths[
                                    selectedEmployee.modeOfDisbursement
                                  ] || 20;
                                if (value.length <= maxLength) {
                                  setSelectedEmployee({
                                    ...selectedEmployee,
                                    accountNumber: value,
                                  });
                                }
                              }}
                              InputProps={{ readOnly: !isEditing }}
                              inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                              }}
                              helperText={
                                selectedEmployee.modeOfDisbursement
                                  ? `Must be ${
                                      {
                                        GCASH: 11,
                                        CEBUANA: 11,
                                        PNB: 12,
                                        RCBC: 10,
                                        EASTWEST: 12,
                                        "AUB (Hello Money)": 12,
                                        LANDBANK: 10,
                                        UNIONBANK: 12,
                                        "BDO NETWORK": 12,
                                        "BDO UNIBANK": 12,
                                        BPI: 12,
                                        "SECURITY BANK": 13,
                                        METROBANK: 13,
                                        CHINABANK: 12,
                                      }[selectedEmployee.modeOfDisbursement] ||
                                      "up to 20"
                                    } digits`
                                  : "Select Mode of Disbursement first"
                              }
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Requirements Section */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: "#2e6385ff",
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <ImageIcon /> Requirements (Softcopy)
                          </Typography>
                          <Button
                            variant="outlined"
                            startIcon={<VisibilityIcon />}
                            onClick={() => {
                              if (selectedEmployee) {
                                fetchSavedRequirements(selectedEmployee._id);
                                setViewAllModalOpen(true);
                              } else {
                                alert("Please select an employee first.");
                              }
                            }}
                            sx={{
                              borderColor: "#2e6385ff",
                              color: "#2e6385ff",
                              "&:hover": {
                                backgroundColor: "rgba(46, 99, 133, 0.08)",
                                borderColor: "#0c2e3fff",
                              },
                            }}
                          >
                            View All Requirements
                          </Button>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {isEditing && (
                          <Box sx={{ mb: 3 }}>
                            <Button
                              variant="outlined"
                              component="label"
                              startIcon={<ImageIcon />}
                              sx={{
                                borderStyle: "dashed",
                                borderWidth: 2,
                                borderColor: "#2e6385ff",
                                color: "#2e6385ff",
                                py: 2,
                                width: "100%",
                                "&:hover": {
                                  backgroundColor: "rgba(46, 99, 133, 0.08)",
                                  borderColor: "#0c2e3fff",
                                },
                              }}
                            >
                              Upload Requirements Images
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={async (e) => {
                                  const files = Array.from(e.target.files);
                                  if (files.length === 0) return;

                                  try {
                                    const uploadedUrls = [];

                                    for (const file of files) {
                                      const response = await axios.post(
                                        "https://api-map.bmphrc.com//save-requirements-images",
                                        {
                                          fileName: file.name,
                                          fileType: file.type,
                                        },
                                      );

                                      const { url } = response.data;

                                      await axios.put(url, file, {
                                        headers: { "Content-Type": file.type },
                                      });

                                      const s3FileUrl = `https://mmp-portal-docs.s3.ap-southeast-1.amazonaws.com/${file.name}`;
                                      uploadedUrls.push(s3FileUrl);
                                    }

                                    setNewUploads((prev) => [
                                      ...prev,
                                      ...uploadedUrls,
                                    ]);
                                    setSelectedEmployee((prev) => ({
                                      ...prev,
                                      requirementsImages: [
                                        ...(prev.requirementsImages || []),
                                        ...uploadedUrls,
                                      ],
                                    }));
                                  } catch (err) {
                                    console.error(
                                      "Upload failed:",
                                      err.response?.data || err.message,
                                    );
                                    alert("Failed to upload image(s).");
                                  }
                                }}
                              />
                            </Button>
                          </Box>
                        )}

                        {newUploads.length > 0 ? (
                          <Grid container spacing={2}>
                            {newUploads.map((url, index) => (
                              <Grid item xs={6} sm={4} md={3} key={index}>
                                <Box
                                  sx={{
                                    position: "relative",
                                    paddingTop: "100%",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: "2px solid #e0e0e0",
                                    "&:hover": {
                                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                      transform: "translateY(-2px)",
                                      transition: "all 0.3s ease",
                                    },
                                  }}
                                >
                                  <img
                                    src={url}
                                    alt={`Uploaded ${index + 1}`}
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setPreviewImage(url)}
                                  />
                                  {isEditing && (
                                    <IconButton
                                      size="small"
                                      sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        backgroundColor:
                                          "rgba(255, 255, 255, 0.95)",
                                        "&:hover": {
                                          backgroundColor:
                                            "rgba(255, 255, 255, 1)",
                                        },
                                      }}
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Are you sure you want to remove this image?",
                                          )
                                        ) {
                                          setNewUploads((prev) =>
                                            prev.filter((img) => img !== url),
                                          );
                                          setSelectedEmployee((prev) => ({
                                            ...prev,
                                            requirementsImages:
                                              prev.requirementsImages?.filter(
                                                (img) => img !== url,
                                              ) || [],
                                          }));
                                        }
                                      }}
                                    >
                                      <DeleteIcon color="error" />
                                    </IconButton>
                                  )}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        ) : (
                          <Box
                            sx={{
                              textAlign: "center",
                              py: 4,
                              color: "#666",
                            }}
                          >
                            <ImageIcon
                              sx={{ fontSize: 64, color: "#ccc", mb: 2 }}
                            />
                            <Typography variant="body1">
                              {isEditing
                                ? "No new images uploaded yet"
                                : "No requirements uploaded"}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        pt: 2,
                      }}
                    >
                      {!isEditing ? (
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          onClick={() => setIsEditing(true)}
                          sx={{
                            backgroundColor: "#2e6385ff",
                            px: 4,
                            py: 1.5,
                            fontSize: "16px",
                            fontWeight: 600,
                            borderRadius: "8px",
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(46, 99, 133, 0.3)",
                            "&:hover": {
                              backgroundColor: "#0c2e3fff",
                              boxShadow: "0 6px 16px rgba(46, 99, 133, 0.4)",
                            },
                          }}
                        >
                          Edit Details
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => handleSaveChanges(selectedEmployee)}
                            sx={{
                              backgroundColor: "#2e6385ff",
                              px: 4,
                              py: 1.5,
                              fontSize: "16px",
                              fontWeight: 600,
                              borderRadius: "8px",
                              textTransform: "none",
                              boxShadow: "0 4px 12px rgba(46, 99, 133, 0.3)",
                              "&:hover": {
                                backgroundColor: "#0c2e3fff",
                                boxShadow: "0 6px 16px rgba(46, 99, 133, 0.4)",
                              },
                            }}
                          >
                            Save Changes
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setIsEditing(false)}
                            sx={{
                              borderColor: "#d32f2f",
                              color: "#d32f2f",
                              px: 4,
                              py: 1.5,
                              fontSize: "16px",
                              fontWeight: 600,
                              borderRadius: "8px",
                              textTransform: "none",
                              "&:hover": {
                                backgroundColor: "rgba(211, 47, 47, 0.08)",
                                borderColor: "#c62828",
                              },
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Fade>
          </Modal>

          {/* View All Requirements Modal */}
          <Modal
            open={viewAllModalOpen}
            onClose={() => setViewAllModalOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
          >
            <Fade in={viewAllModalOpen}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "95%", sm: "85%", md: "75%", lg: "65%" },
                  maxHeight: "90vh",
                  bgcolor: "background.paper",
                  borderRadius: "16px",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                  overflow: "hidden",
                }}
              >
                {/* Modal Header */}
                <Box
                  sx={{
                    background:
                      "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
                    p: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <ImageIcon sx={{ color: "white" }} />
                    </Avatar>
                    <Typography
                      variant="h5"
                      sx={{ color: "white", fontWeight: 700 }}
                    >
                      All Uploaded Requirements
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => setViewAllModalOpen(false)}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Modal Body */}
                <Box
                  sx={{
                    p: 4,
                    maxHeight: "calc(90vh - 100px)",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "8px",
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
                  {viewRequirements.length > 0 ? (
                    <Grid container spacing={3}>
                      {viewRequirements.map((url, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Box
                            sx={{
                              position: "relative",
                              paddingTop: "100%",
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "2px solid #e0e0e0",
                              "&:hover": {
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                transform: "translateY(-2px)",
                                transition: "all 0.3s ease",
                              },
                            }}
                          >
                            <img
                              src={url}
                              alt={`Requirement ${index + 1}`}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                              onClick={() => setPreviewImage(url)}
                            />
                            {isEditing && (
                              <IconButton
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                                  "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 1)",
                                  },
                                }}
                                onClick={async () => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this image?",
                                    )
                                  ) {
                                    setViewRequirements((prev) =>
                                      prev.filter((_, i) => i !== index),
                                    );
                                    setSelectedEmployee((prev) => ({
                                      ...prev,
                                      requirementsImages:
                                        prev.requirementsImages?.filter(
                                          (_, i) => i !== index,
                                        ),
                                    }));
                                  }
                                }}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            )}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 8,
                        color: "#666",
                      }}
                    >
                      <ImageIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        No Requirements Found
                      </Typography>
                      <Typography variant="body2">
                        No uploaded requirements found for this employee.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Fade>
          </Modal>

          {/* Image Preview Modal */}
          <Modal
            open={!!previewImage}
            onClose={() => setPreviewImage(null)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
            }}
          >
            <Fade in={!!previewImage}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "95vw",
                  maxHeight: "95vh",
                  outline: "none",
                }}
              >
                <IconButton
                  onClick={() => setPreviewImage(null)}
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: 0,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    maxWidth: "95vw",
                    maxHeight: "95vh",
                    borderRadius: "12px",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
                  }}
                />
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
    </>
  );
}
