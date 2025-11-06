import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import dayjs from "dayjs";

export default function BmpowerHO() {
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

  function CustomToolbar() {
    return (
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Move Quick Filter to the LEFT */}
        <GridToolbarQuickFilter sx={{ mr: 2 }} />

        {/* Optional: You can place other buttons or info on the right */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Add custom buttons here if needed */}
        </Box>
      </Box>
    );
  }

  const fetchSavedRequirements = async (employeeEmail) => {
    try {
      const response = await axios.get(
        "https://api-map.bmphrc.com/get-merch-accounts"
      );

      // Find the employee using their email (or use employeeNo/_id if you prefer)
      const employee = response.data.find((emp) => emp.email === employeeEmail);

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
      setFilteredAccounts(accounts); // show all if unfiltered
    } else {
      const filtered = accounts.filter(
        (acc) => acc.remarks?.toLowerCase() === value.toLowerCase() // case-insensitive match
      );
      setFilteredAccounts(filtered);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedEmployee(null);
  };

  const handleSaveChanges = async (updatedEmployee) => {
    try {
      const adminFullName = localStorage.getItem("adminFullName"); // should now exist!
      const payload = {
        ...updatedEmployee,
        updatedBy: adminFullName || "Unknown", // fallback if not found
      };

      console.log("✅ Sending update with admin:", payload.updatedBy);

      await axios.put(
        `https://api-map.bmphrc.com/update-employee/${updatedEmployee._id}`,
        payload
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
          "https://api-map.bmphrc.com/get-merch-accounts"
        );

        // Filter only MARABOU company
        const bmpowerAccounts = response.data.filter(
          (acc) =>
            acc.company?.toUpperCase() ===
              "BMPOWER HUMAN RESOURCES CORPORATION" &&
            acc.clientAssigned?.toUpperCase() === "SHELFMATE"
        );

        setAccounts(bmpowerAccounts);
        setFilteredAccounts(bmpowerAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const columns = [
    { field: "count", headerName: "#", width: 70 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "middleName", headerName: "Middle Name", width: 130 },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 150,
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
    { field: "age", headerName: "Age", width: 80 },
    { field: "sss", headerName: "SSS No.", width: 120 },
    { field: "philhealth", headerName: "PHIC No.", width: 120 },
    { field: "hdmf", headerName: "HDMF No.", width: 120 },
    { field: "tin", headerName: "TIN No.", width: 120 },
    { field: "company", headerName: "Company", width: 400 },
    { field: "remarks", headerName: "Remarks", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "employeeNo", headerName: "Employee No.", width: 120 },

    {
      field: "modeOfDisbursement",
      headerName: "Mode of Disbursement",
      width: 200,
    },
    { field: "accountNumber", headerName: "Account Number", width: 200 },
    { field: "contact", headerName: "Contact", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "position", headerName: "Position", width: 150 },
    {
      field: "dateHired",
      headerName: "Date Hired",
      width: 150,
      valueGetter: (value, row) => {
        const raw = row?.dateHired;
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
    { field: "homeAddress", headerName: "Home Address", width: 250 },
    { field: "silBalance", headerName: "SIL Balance", width: 120 },
    { field: "clientAssigned", headerName: "Client Assigned", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  // Assign a unique ID for DataGrid
  const rows = filteredAccounts.map((acc, index) => ({
    id: acc._id || index,
    count: index + 1,
    ...acc,
  }));

  return (
    <div className="accountPage">
      <Topbar />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            backgroundColor: "#003554",
            minHeight: "auto",
            color: "#fff",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Employee Accounts for SHELFMATE
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <FormControl sx={{ width: 200 }}>
              <Select
                value={selectedRemarks}
                onChange={handleRemarksChange}
                displayEmpty
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem value="" disabled>
                  Select Remarks
                </MenuItem>
                <MenuItem value="UNFILTERED">UNFILTERED</MenuItem>
                <MenuItem value="Applicant">Applicant</MenuItem>
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Resign">Resign</MenuItem>
                <MenuItem value="Terminate">Terminate</MenuItem>
                <MenuItem value="End of Contract">End of Contract</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              height: "100%",
              maxWidth: 1700,
              maxHeight: "80vh",
              marginTop: 2,
              overflow: "hidden",
              "& .MuiDataGrid-root": {
                backgroundColor: "#fff",
              },
            }}
          >
            <Modal
              open={openEditModal}
              onClose={handleCloseEditModal}
              aria-labelledby="edit-employee-modal"
              aria-describedby="edit-employee-details"
            >
              <Box
                sx={{
                  padding: 4,
                  backgroundColor: "white",
                  margin: { xs: "10% auto", md: "5% auto" },
                  width: { xs: "90%", sm: "70%", md: "50%" },
                  maxHeight: "80vh",
                  overflowY: "auto",
                  boxShadow: 24,
                  borderRadius: 2,
                }}
              >
                <Typography
                  id="edit-employee-modal"
                  variant="h6"
                  component="h2"
                >
                  Employee Full Details
                </Typography>

                {selectedEmployee && (
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    {/* COMPANY DROPDOWN */}
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

                    {/* STATUS */}
                    {isEditing ? (
                      <TextField
                        select
                        label="Status"
                        fullWidth
                        value={selectedEmployee.status || ""}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            status: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </TextField>
                    ) : (
                      <TextField
                        label="Status"
                        fullWidth
                        value={selectedEmployee.status || ""}
                        InputProps={{ readOnly: true }}
                      />
                    )}

                    {/* REMARKS DROPDOWN */}
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
                          <MenuItem value="Applicant">Applicant</MenuItem>
                          <MenuItem value="Employed">Employed</MenuItem>
                          <MenuItem value="Resign">Resign</MenuItem>
                          <MenuItem value="Terminate">Terminate</MenuItem>
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

                    {/* EMPLOYEE NO */}
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

                    {/* FIRST, MIDDLE, LAST NAME */}
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
                    />
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
                    />
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
                    />
                    {isEditing ? (
                      <FormControl fullWidth>
                        <InputLabel>Mode of Disbursement</InputLabel>
                        <Select
                          value={selectedEmployee.modeOfDisbursement || ""}
                          label="Mode of Disbursement"
                          onChange={(e) => {
                            const value = e.target.value;
                            // Reset account number when mode changes
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
                          <MenuItem value="BDO NETWORK">BDO NETWORK</MenuItem>
                          <MenuItem value="BDO UNIBANK">BDO UNIBANK</MenuItem>
                          <MenuItem value="BPI">BPI</MenuItem>
                          <MenuItem value="CEBUANA">CEBUANA</MenuItem>
                          <MenuItem value="CHINABANK">CHINABANK</MenuItem>
                          <MenuItem value="EASTWEST">EASTWEST</MenuItem>
                          <MenuItem value="GCASH">GCASH</MenuItem>
                          <MenuItem value="LANDBANK">LANDBANK</MenuItem>
                          <MenuItem value="METROBANK">METROBANK</MenuItem>
                          <MenuItem value="PNB">PNB</MenuItem>
                          <MenuItem value="RCBC">RCBC</MenuItem>
                          <MenuItem value="SECURITY BANK">
                            SECURITY BANK
                          </MenuItem>
                          <MenuItem value="UNIONBANK">UNIONBANK</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        label="Mode of Disbursement"
                        fullWidth
                        value={selectedEmployee.modeOfDisbursement || ""}
                        InputProps={{ readOnly: true }}
                      />
                    )}

                    <TextField
                      label="Account Number"
                      fullWidth
                      value={selectedEmployee.accountNumber || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, ""); // ✅ digits only

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
                          maxLengths[selectedEmployee.modeOfDisbursement] || 20;

                        if (value.length <= maxLength) {
                          setSelectedEmployee({
                            ...selectedEmployee,
                            accountNumber: value,
                          });
                        }
                      }}
                      InputProps={{ readOnly: !isEditing }}
                      inputProps={{
                        inputMode: "numeric", // ✅ mobile numeric keyboard
                        pattern: "[0-9]*", // ✅ HTML validation: digits only
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

                    {/* CONTACT + EMAIL */}
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

                    {/* BIRTHDAY */}
                    <TextField
                      label="Birthday"
                      fullWidth
                      type="date"
                      value={
                        selectedEmployee.birthday
                          ? dayjs(selectedEmployee.birthday).format(
                              "YYYY-MM-DD"
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
                    />

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

                    <TextField
                      label="SSS No."
                      fullWidth
                      value={selectedEmployee.sss || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          sss: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="PHIC No."
                      fullWidth
                      value={selectedEmployee.philhealth || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          philhealth: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="HDMF No."
                      fullWidth
                      value={selectedEmployee.hdmf || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          hdmf: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="TIN No."
                      fullWidth
                      value={selectedEmployee.tin || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          tin: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

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

                    {/* DATE HIRED */}
                    <TextField
                      label="Date Hired"
                      fullWidth
                      type="date"
                      value={
                        selectedEmployee.dateHired
                          ? dayjs(selectedEmployee.dateHired).format(
                              "YYYY-MM-DD"
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
                    />

                    <TextField
                      label="Home Address"
                      fullWidth
                      value={selectedEmployee.homeAddress || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          homeAddress: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

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

                    {/* CLIENT ASSIGNED DROPDOWN */}
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
                          <MenuItem value="CARMENS BEST">CARMENS BEST</MenuItem>
                          <MenuItem value="ECOSSENTIAL FOODS CORP">
                            ECOSSENTIAL FOODS CORP
                          </MenuItem>
                          <MenuItem value="ECOSSENTIAL FOODS CORP-HEAD OFFICE">
                            ECOSSENTIAL FOODS CORP-HEAD OFFICE
                          </MenuItem>
                          <MenuItem value="ENGKANTO">ENGKANTO</MenuItem>
                          <MenuItem value="J-GYU INC">J-GYU INC</MenuItem>
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
                          <MenuItem value="ROYAL CANIN PHILS.">
                            ROYAL CANIN PHILS.
                          </MenuItem>
                          <MenuItem value="SHELFMATE">SHELFMATE</MenuItem>
                          <MenuItem value="SPX EXPRESS">SPX EXPRESS</MenuItem>
                          <MenuItem value="UNIVERSAL HARVESTER DAIRY FARM INC">
                            UNIVERSAL HARVESTER DAIRY FARM INC
                          </MenuItem>
                          <MenuItem value="UNION GALVASTEEL CO.">
                            UNION GALVASTEEL CO.
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
                    {/* VIEW ALL REQUIREMENTS BUTTON */}
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                        borderColor: "#0A21C0",
                        color: "#0A21C0",
                        "&:hover": { backgroundColor: "#0A21C020" },
                      }}
                      onClick={() => {
                        if (selectedEmployee?.email) {
                          fetchSavedRequirements(selectedEmployee.email); // ✅ Fetch employee’s saved images
                          setViewAllModalOpen(true);
                        } else {
                          alert("Please select an employee first.");
                        }
                      }}
                    >
                      View All Requirements
                    </Button>

                    {/* VIEW ALL REQUIREMENTS MODAL */}
                    <Modal
                      open={viewAllModalOpen}
                      onClose={() => setViewAllModalOpen(false)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "90%",
                          maxWidth: 900,
                          maxHeight: "90vh",
                          bgcolor: "background.paper",
                          borderRadius: "10px",
                          boxShadow: 24,
                          overflowY: "auto",
                          p: 3,
                          position: "relative",
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Uploaded Requirements
                        </Typography>

                        <IconButton
                          sx={{ position: "absolute", top: 8, right: 8 }}
                          onClick={() => setViewAllModalOpen(false)}
                        >
                          <CloseIcon />
                        </IconButton>

                        {viewRequirements.length > 0 ? (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 2,
                              justifyContent: "center",
                              mt: 2,
                            }}
                          >
                            {viewRequirements.map((url, index) => (
                              <Box
                                key={index}
                                sx={{
                                  position: "relative",
                                  textAlign: "center",
                                }}
                              >
                                <img
                                  src={url}
                                  alt={`Requirement ${index + 1}`}
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    border: "1px solid #ccc",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setPreviewImage(url)}
                                />

                                {/* 🗑️ Delete icon inside modal (only in edit mode) */}
                                {isEditing && (
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: "absolute",
                                      top: 6,
                                      right: 6,
                                      backgroundColor: "rgba(255,255,255,0.8)",
                                    }}
                                    onClick={async () => {
                                      if (
                                        window.confirm(
                                          "Are you sure you want to delete this image?"
                                        )
                                      ) {
                                        setViewRequirements((prev) =>
                                          prev.filter((_, i) => i !== index)
                                        );

                                        // Also remove from selectedEmployee if exists
                                        setSelectedEmployee((prev) => ({
                                          ...prev,
                                          requirementsImages:
                                            prev.requirementsImages?.filter(
                                              (_, i) => i !== index
                                            ),
                                        }));
                                      }
                                    }}
                                  >
                                    <DeleteIcon color="error" />
                                  </IconButton>
                                )}
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          <Typography align="center" sx={{ mt: 3 }}>
                            No uploaded requirements found for this employee.
                          </Typography>
                        )}
                      </Box>
                    </Modal>

                    {/* UPLOADED REQUIREMENTS IMAGES */}
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1">
                        Uploaded Requirements (Softcopy)
                      </Typography>

                      {/* Upload button only in edit mode */}
                      {isEditing && (
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ marginTop: "8px" }}
                          onChange={async (e) => {
                            const files = Array.from(e.target.files);
                            if (files.length === 0) return;

                            try {
                              const uploadedUrls = [];

                              for (const file of files) {
                                // 1️⃣ Request pre-signed URL
                                const response = await axios.post(
                                  "https://api-map.bmphrc.com/save-requirements-images",
                                  { fileName: file.name, fileType: file.type }
                                );

                                const { url } = response.data;

                                // 2️⃣ Upload to S3
                                await axios.put(url, file, {
                                  headers: { "Content-Type": file.type },
                                });

                                // 3️⃣ Construct public URL
                                const s3FileUrl = `https://mmp-portal-docs.s3.ap-southeast-1.amazonaws.com/${file.name}`;
                                uploadedUrls.push(s3FileUrl);
                              }

                              // 4️⃣ Save to newUploads (so they appear immediately)
                              setNewUploads((prev) => [
                                ...prev,
                                ...uploadedUrls,
                              ]);

                              // 5️⃣ Also store in selectedEmployee (for save logic)
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
                                err.response?.data || err.message
                              );
                              alert("Failed to upload image(s).");
                            }
                          }}
                        />
                      )}

                      {/* IMAGE THUMBNAILS — show ONLY newly uploaded ones (not saved ones) */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        {newUploads.map((url, index) => (
                          <Box key={index} sx={{ position: "relative" }}>
                            <img
                              src={url}
                              alt={`Uploaded ${index + 1}`}
                              style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "10px",
                                objectFit: "cover",
                                border: "1px solid #ccc",
                                cursor: "pointer",
                              }}
                              onClick={() => setPreviewImage(url)}
                            />

                            {isEditing && (
                              <IconButton
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: 4,
                                  right: 4,
                                  backgroundColor: "rgba(255,255,255,0.8)",
                                }}
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to remove this image?"
                                    )
                                  ) {
                                    setNewUploads((prev) =>
                                      prev.filter((img) => img !== url)
                                    );
                                    setSelectedEmployee((prev) => ({
                                      ...prev,
                                      requirementsImages:
                                        prev.requirementsImages?.filter(
                                          (img) => img !== url
                                        ) || [],
                                    }));
                                  }
                                }}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* 🖼️ SINGLE IMAGE PREVIEW MODAL */}
                    <Modal
                      open={!!previewImage}
                      onClose={() => setPreviewImage(null)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          bgcolor: "background.paper",
                          p: 2,
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{
                            maxWidth: "90vw",
                            maxHeight: "80vh",
                            borderRadius: "10px",
                          }}
                        />
                        <IconButton
                          sx={{ position: "absolute", top: 8, right: 8 }}
                          onClick={() => setPreviewImage(null)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Modal>

                    {/* BUTTONS */}
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      sx={{ mt: 2 }}
                    >
                      {!isEditing ? (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#0A21C0",
                            color: "#FFFFFF",
                            "&:hover": { backgroundColor: "#0A21C0" },
                          }}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#0A21C0",
                              color: "#FFFFFF",
                              "&:hover": { backgroundColor: "#0A21C0" },
                            }}
                            onClick={() => handleSaveChanges(selectedEmployee)}
                          >
                            Save Changes
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              backgroundColor: "#A31D1D",
                              color: "#FFFFFF",
                              "&:hover": { backgroundColor: "#A31D1D" },
                            }}
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Stack>
                )}
              </Box>
            </Modal>

            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                columns: {
                  columnVisibilityModel: {
                    contactNum: false,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar, toolbar: CustomToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: true },
                },
              }}
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
              pageSizeOptions={[5, 10, 20, 50]}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
